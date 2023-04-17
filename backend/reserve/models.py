from django.db import models

# Create your models here.
class Reserve(models.Model):
    reserve_no = models.AutoField(primary_key=True)
    car_no = models.IntegerField()
    user_no = models.IntegerField()
    reserve_total_price = models.IntegerField()
    reserve_status = models.CharField(max_length=15, default="예약중")
    reserve_start_date = models.DateTimeField()
    reserve_end_date = models.DateTimeField()
    reserve_start_zone = models.IntegerField()
    reserve_end_zone = models.IntegerField(null=True)
    reserve_excess_cost = models.IntegerField(default=0)
    reserve_accident_status = models.BooleanField(default=False)
    reserve_created_at = models.DateTimeField(auto_now_add=True)
    reserve_updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.reserve_no + "_" + self.reserve_status + "_" + self.reserve_start_date + "_" + self.reserve_end_date