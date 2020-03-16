from django.db import models

# Creating a model of video to store a video file.
class Video(models.Model):
    video_vid = models.FileField(null=True,blank=True)
    
    
