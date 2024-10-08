from django.contrib import admin
from django.urls import path, include
from api.views import LoginView, RegisterView 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('', LoginView.as_view(), name='default_login'),   
]
