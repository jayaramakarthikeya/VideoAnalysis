from rest_framework import serializers
from .models import Video

#Creating a video Serializer
class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'
    