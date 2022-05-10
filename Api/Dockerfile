FROM python:3-alpine3.10

WORKDIR /app
ENV DB_HOST 34.122.229.197
ENV DB_NAME practica3y4
ENV DB_USER root
ENV DB_PASS 1234

COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
EXPOSE 8000