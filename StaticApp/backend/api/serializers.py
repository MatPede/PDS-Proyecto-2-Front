from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'name', 'role', 'password']
        extra_kwargs = {'password': {'write_only': True}} 

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Un usuario con este email ya existe")
        return value

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            name=validated_data['name'],
            role=validated_data.get('role', False)  
        )
        user.set_password(validated_data['password'])  
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if not User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Usuario con este email no existe")
        return data
