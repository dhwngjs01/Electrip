from django.db import models


""" User Model Definition """
"""
    user_no = 회원_번호
    user_id = 회원_아이디
    user_password = 회원_비밀번호
    user_name = 회원_이름
    user_phone = 회원_전화번호
    user_email = 회원_이메일
    user_zip = 회원_우편번호
    user_address = 회원_주소
    user_detail_address = 회원_상세주소
    user_created_at = 회원_생성일
    user_updated_at = 회원_수정일
    user_disabled = 회원_탈퇴여부
 """

# Create your models here.
class User(models.Model):
    user_no = models.AutoField(primary_key=True)
    user_id = models.CharField(max_length=30)
    user_password = models.CharField(max_length=30)
    user_name = models.CharField(max_length=20)
    user_phone = models.CharField(max_length=20)
    user_email = models.CharField(max_length=50)
    user_zipcode = models.IntegerField()
    user_address = models.TextField()
    user_detail_address = models.TextField()
    user_created_at = models.DateTimeField(auto_now_add=True)
    user_updated_at = models.DateTimeField(auto_now=True)
    user_disabled = models.BooleanField(default=False)

    def __str__(self):
        return self.user_no + "_" + self.user_id + "_" + self.user_name