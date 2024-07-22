from django.core.exceptions import ValidationError

def validate_no_numbers(value):
    if any(char.isdigit() for char in value):
        raise ValidationError('Name should not contain numbers.')
