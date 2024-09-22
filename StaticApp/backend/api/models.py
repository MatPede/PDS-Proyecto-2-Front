from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None, role=False):
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(email=self.normalize_email(email), name=name, role=role)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password):
        user = self.create_user(email, password=password, name=name)
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    role = models.BooleanField(default=False)
    password = models.CharField(max_length=128)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email

class Topic(models.Model):
    topic_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    pre_requisite = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class UserTopic(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    elo = models.FloatField(default=0.0)
    time = models.DateTimeField(auto_now_add=True)

class TasksAlternative(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    answers_alternative_id_list = models.JSONField()
    time = models.DateTimeField(auto_now_add=True)

class QuestionsAlternative(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    correct_answer = models.CharField(max_length=255)
    wrong_1 = models.CharField(max_length=255)
    wrong_2 = models.CharField(max_length=255)
    wrong_3 = models.CharField(max_length=255)
    explanation_1 = models.TextField()
    explanation_2 = models.TextField()
    explanation_3 = models.TextField()
    link_image = models.CharField(max_length=255)
    difficulty = models.IntegerField()

class AnswerAlternative(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question_alternative = models.ForeignKey(QuestionsAlternative, on_delete=models.CASCADE)
    answer_1 = models.IntegerField()
    answer_2 = models.IntegerField()
    status = models.BooleanField(default=False)

class TasksCalculus(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    answers_calculus_id = models.JSONField()
    time = models.DateTimeField(auto_now_add=True)

class Templates(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    difficulty = models.IntegerField()

class AnswerCalculus(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    template = models.ForeignKey(Templates, on_delete=models.CASCADE)
    answers = models.JSONField()
    hints = models.IntegerField()
    values = models.CharField(max_length=255)
