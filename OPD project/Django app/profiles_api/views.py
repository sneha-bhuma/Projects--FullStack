import json
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets

from profiles_api import permissions, serializers
from profiles_api import models

from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.permissions import IsAuthenticated

from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings

from profiles_api.models import Appointment, Doctor, Patient
from profiles_api.serializers import AppointmentModelSerializer, DoctorModelSerializer, PatientModelSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

class UserProfileViewSet(viewsets.ModelViewSet):
    """Handle creating, creating and updating profiles"""
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)

class UserLoginApiView(ObtainAuthToken):
    """Handle creating user authentication tokens"""
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

class DoctorViewSet(viewsets.ModelViewSet):
    """API ViewSet"""
    serializer_class = DoctorModelSerializer
    queryset = Doctor.objects.all()
  
   
class PatientViewSet(viewsets.ModelViewSet):
    serializer_class = PatientModelSerializer
    queryset = Patient.objects.all()
  
   
class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentModelSerializer
    queryset = Appointment.objects.all()
  
   
class DoctorApiView(APIView):
    serializer_class = DoctorModelSerializer

    def get(self, request, doctor_id=None):
        if doctor_id:
            doctor = Doctor.objects.filter(doctor_id=doctor_id).values()
            if doctor:
                return Response(doctor[0], status=200)
            else:
                return Response("Doctor not found", status=404)
        else:
            doctors = Doctor.objects.all().values()
            if doctors:
                return Response(list(doctors), status=200)
            return Response("Issue in fecthing the doctors", status=400)
        
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            doctor = serializer.save()
            return Response(f"Doctor Registration successful \ndoctor_id: {doctor.doctor_id}", status=200)

        return Response(f"Some issue in data", status=400)
        
    def delete(self, request, doctor_id):
        res = Doctor.objects.filter(doctor_id=doctor_id).delete()
        if res:
            return Response(f"Doctor {doctor_id} deleted sucessfully.", status=200)
        
        return Response(f"Doctor is not deleted", status=400)

    def put(self, request):
        data = request.data
        Doctor.objects.filter(doctor_id=data['doctor_id']).update(**data)
        return Response(f"Doctor details is updated successfully", status=200)

class PatientApiView(APIView):
    serializer_class = PatientModelSerializer
    
    def get(self, request, patient_id=None, email=None):
        if patient_id:
            patient = Patient.objects.filter(patient_id=patient_id).values()
            if patient:
                return Response(patient[0], status=200)
            else:
                return Response(f"Patient not found with ID {patient_id}", status=404)
        elif email:
            patient = Patient.objects.filter(email=email).values()
            if patient:
                return Response(patient[0], status=200)
            else:
                return Response(f"Patient not found with email {email}", status=400)
        else:
            patients = Patient.objects.all().values()
            if patients:
                return Response(list(patients), status=200)
            
            return Response("Error in fetching the patient details", status=400)
    
    def post(self, request):
        data = request.data.copy()
        if 'csrfmiddlewaretoken' in data:
            data.pop('csrfmiddlewaretoken')
        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            patient = serializer.save()
            return Response(patient.patient_id, status=200)
        
        return Response(f"Some issue in data", status=400) 
           
    def put(self, request):
        data = request.data
        res = Patient.objects.filter(patient_id=data['patient_id']).update(**data)
        if res:
            return Response(f"Patient details updated successfully.", status=200)
        
        return Response(f"Error while updating the patient details", status=400)
    
    def patch(self, request, patient_id=None):
        data = request.data
        try:
            patient = Patient.objects.get(patient_id=patient_id)
        except Patient.DoesNotExist:
            return Response(f"Patient not found with ID {patient_id}", status=404)

        serializer = self.serializer_class(patient, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(f"Patient details updated successfully.", status=200)
        else:
            return Response(serializer.errors, status=400)
    
    
    def delete(self, request, patient_id):
        res = Patient.objects.filter(patient_id=patient_id).delete()
        if res:
            return Response(f"Patient: {patient_id} deleted successfully.", status=200)
        
        return Response(f"Error while deleting the patient", status=400)

class AppointmentApiView(APIView):
    serializer_class = AppointmentModelSerializer

    # Get the list of all the appointments and if patient_id is passed, fetch appointments for that patient
    def get(self, request, patient_id=None):
        if patient_id:
            appointments = Appointment.objects.filter(patient__patient_id=patient_id).values()
            if appointments:
                return Response(list(appointments), status=200)
            else:
                return Response(f"No appointments found for the given patient id", status=404)
        else:
            appointments = Appointment.objects.all().values()
            if appointments:
                return Response(list(appointments), status=200)
            
            return Response(f"Error while fetching the appointment details", status=400)
    
    def post(self, request):
        data = request.data.copy()
        if 'csrfmiddlewaretoken' in data:
            data.pop('csrfmiddlewaretoken', None)
        
        patient = Patient.objects.get(patient_id=data['patient_id'], patient_name=data['patient_name'])
        doctor = Doctor.objects.get(doctor_id=data['doctor_id'], speciality=data['speciality'])
        data['patient'] = patient
        data['doctor']  = doctor
        data.pop('patient_id',None)
        data.pop('doctor_id',None)
        
        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            appointment = Appointment.objects.create(
                patient=data['patient'],
                doctor =data['doctor'],
                appointment_date=data['appointment_date'],
                slot=data['slot'],
                problem_description=data['problem_description'],
            )
            Appointment.save(appointment)
            return Response(f"Appointment is scheduled successfully with {appointment.doctor.doctor_name}, Appointment ID : {appointment.appointment_id}", status=200)
        else:
            return Response(f"Error in booking the appointment {serializer.errors}, {patient}", status=400)
        

    def put(self, request):
        data = request.data
        res = Appointment.objects.filter(appointment_id=data['appointment_id']).update(**data)
        if res:
            return Response(f"Appointment re-scheduled successfully.", status=200)
        
        return Response(f"Error while re-scheduling the appointment.", status=400)

    def delete(self, request, appointment_id):
        res = Appointment.objects.filter(appointment_id=appointment_id).delete()
        if res:
            return Response(f"Appointment cancelled successfully.", status=200)
        
        return Response(f"Error while cancelling the appointment.", status=400)
