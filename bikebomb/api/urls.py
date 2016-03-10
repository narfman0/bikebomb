from django.conf.urls import include, patterns
from django.contrib import admin
from rest_framework import routers, permissions, serializers, viewsets
from bikestats.models import Make, Model, Stat


class MakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Make
        fields = '__all__'


class MakeViewSet(viewsets.ModelViewSet):
    queryset = Make.objects.all()
    serializer_class = MakeSerializer


class ModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Model
        fields = '__all__'


class ModelViewSet(viewsets.ModelViewSet):
    queryset = Model.objects.all()
    serializer_class = ModelSerializer


class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = '__all__'


class StatViewSet(viewsets.ModelViewSet):
    queryset = Stat.objects.all()
    serializer_class = StatSerializer


admin.autodiscover()
router = routers.DefaultRouter()
router.register(r'makes', MakeViewSet)
router.register(r'models', ModelViewSet)
router.register(r'stats', StatViewSet)

urlpatterns = patterns('',
    (r'^', include(router.urls)),
)
