from django.conf.urls import include, patterns
from django.contrib import admin
from rest_framework import routers, permissions, serializers, viewsets
from core.models import Module
from assessment.models import Assessment
from goal.models import Goal
from objective.models import Objective
from session.models import Session
admin.autodiscover()


router = routers.DefaultRouter()


class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = '__all__'


class ModuleViewSet(viewsets.ModelViewSet):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    permission_classes = [permissions.IsAdminUser]


router.register(r'modules', ModuleViewSet)


class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        fields = '__all__'


class AssessmentViewSet(viewsets.ModelViewSet):
    queryset = Assessment.objects.all()
    serializer_class = AssessmentSerializer
    permission_classes = [permissions.IsAdminUser]


router.register(r'assessments', AssessmentViewSet)


class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = '__all__'


class GoalViewSet(viewsets.ModelViewSet):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer
    permission_classes = [permissions.IsAdminUser]


router.register(r'goals', GoalViewSet)


class ObjectiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Objective
        fields = '__all__'


class ObjectiveViewSet(viewsets.ModelViewSet):
    queryset = Objective.objects.all()
    serializer_class = ObjectiveSerializer
    permission_classes = [permissions.IsAdminUser]


router.register(r'objectives', ObjectiveViewSet)


class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'


class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    permission_classes = [permissions.IsAdminUser]


router.register(r'sessions', SessionViewSet)


urlpatterns = patterns('',
    (r'^', include(router.urls)),
)
