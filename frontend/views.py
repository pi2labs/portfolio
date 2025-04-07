from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import EmailMessage


# Create your views here.

def index(request):
    form_submitted = False

    if request.method == 'POST':
        form_submitted = True
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message_content = request.POST.get('message')

        EmailMessage(
            subject,
            message_content,
            email,
            ['nagarjun@bagalore.dev'],
            reply_to=[email]
        ).send(fail_silently=False)

        if not name or not message_content:
            messages.error(request, 'Message is not sent, please try again')
        else:
            messages.success(request, 'Message sent successfully')

        return redirect('portfolio')


    return render(request, 'portfolio.html')
