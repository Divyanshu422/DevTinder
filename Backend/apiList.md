# DevTinder APIs

## authRouter
- POST /signup -> for registering in the platform 
- POST /login -> for logging in to the platform
- POST /logout -> for logging out from the platform

## profileRouter
- GET /profile/view -> this Api is for view user profile 
- PATCH /profile/edit -> this Api is for editing user profile
- PATCH /profile/password -> this is change password API

## connectionRequestRouter
- POST /request/send/interested/:userId -> this is for sending a connection request 
- POST /request/send/ignored/:userId -> this is for sending a ignored request 
- POST /request/review/accepted/:requestId -> this is for accepting a connection request
- POST /request/review/rejected/:requestId

## userRouter
- GET /user/connections -> Gets you the profiles of other users on platform
- GET /user/requests/received -> Gets you the profiles of other users on platform
- GET /user/feed -> Gets you the profiles of other users on platform