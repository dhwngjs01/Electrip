from django.urls import path, include
from user.API.views import (
    NaverLoginAPIView, NaverCallbackAPIView, NaverToDjangoLoginView
    )

urlpatterns = [
    path('naver/login', NaverLoginAPIView.as_view()),

    # 여기서 callback url은 반드시 Naver 로그인 API 설정 당시 작성했던
    # callback url로 지정해주어야 한다. 앞의 user/ 까지 더해지면
    # http://127.0.0.1:8000/user/naver/callback 이 된다.
    path('naver/callback', NaverCallbackAPIView.as_view()),

    path('naver/login/success', NaverToDjangoLoginView.as_view()),
]