from fastapi import FastAPI
from fastapi import status, Response
from fastapi.middleware.cors import CORSMiddleware
from app.router.user_router import router as user_router

app = FastAPI()
app.include_router(user_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def root(response: Response):
    response.status_code = status.HTTP_200_OK
    return {'message': 'Hello from python'}