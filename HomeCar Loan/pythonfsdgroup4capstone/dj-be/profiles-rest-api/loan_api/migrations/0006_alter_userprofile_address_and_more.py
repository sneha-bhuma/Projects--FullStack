# Generated by Django 5.0.6 on 2024-07-02 15:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loan_api', '0005_alter_loanapplication_tenure'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='address',
            field=models.TextField(blank=True, default='', null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='bank_account_details',
            field=models.CharField(blank=True, default='', max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='gender',
            field=models.CharField(blank=True, choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')], default='', max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='marital_status',
            field=models.CharField(blank=True, choices=[('single', 'Single'), ('married', 'Married')], default='', max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='monthly_income',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='occupation',
            field=models.CharField(blank=True, default='', max_length=50, null=True),
        ),
    ]
