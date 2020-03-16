from .models import Video
from rest_framework import viewsets,permissions
from .serializers import VideoSerializer

#Creating a Video viewset
class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = VideoSerializer
    
