from fastapi import FastAPI
from fastapi import status, Response
from fastapi.middleware.cors import CORSMiddleware
from app.router.user_router import router as user_router
from app.router.friend_router import router as friend_router
from app.router.publication_router import router as publication_router


app = FastAPI()
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
