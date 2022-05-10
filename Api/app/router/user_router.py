from fastapi import APIRouter
from fastapi import status, Response
from app.models.user import user_in, login_in
from app.controllers.user_controller import new_user, login, get_user_data

router = APIRouter(prefix="/api/user")

@router.post("/register/")
def create_user(data: user_in, response: Response):
    res = new_user(data)
    if res['success']:
        response.status_code = status.HTTP_201_CREATED
    else:
        response.status_code = status.HTTP_400_BAD_REQUEST
    return res

@router.post("/login/")
def login_(data: login_in, response: Response):
    res = login(data)
    if res['success']:
        response.status_code = status.HTTP_200_OK
    else:
        response.status_code = status.HTTP_400_BAD_REQUEST
    return res

@router.get("/user/{id_user}/")
def get_user_(id_user, response: Response):
    res = get_user_data(id_user)
    if res['success']:
        response.status_code = status.HTTP_200_OK
    else:
        response.status_code = status.HTTP_400_BAD_REQUEST
    return res
