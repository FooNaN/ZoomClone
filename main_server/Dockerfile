# Use lightweight Python 3.8 image
FROM python:3.8-slim

# Set directory for Docker App
WORKDIR /app

# Install dependencies
COPY requirements.txt ./
RUN pip3 install -r requirements.txt

# Copy source code into container
COPY . .

# Set port to 5000
EXPOSE 5000

# Run
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]