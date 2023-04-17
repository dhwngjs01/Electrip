from django.db import models

# Create your models here.
class Car(models.Model):
    car_no = models.AutoField(primary_key=True)
    pos_no = models.IntegerField()
    car_name = models.CharField(max_length=100)
    car_brand = models.CharField(max_length=50)
    car_plate = models.CharField(max_length=30)
    car_type = models.CharField(max_length=30)
    car_meter = models.IntegerField()
    car_price = models.IntegerField()
    car_status = models.CharField(max_length=20)
    car_contents = models.TextField()
    car_created_at = models.DateTimeField(auto_now_add=True)
    car_updated_at = models.DateTimeField(auto_now=True)
    car_activate = models.BooleanField(default=True)

    def __str__(self):
        return self.car_no + "_" + self.car_name + "_" + self.car_brand + "_" + self.car_plate + "_" + self.car_type + "_" + self.car_status + "_" + self.car_activate