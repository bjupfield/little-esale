class SessionController < ApplicationController
    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: {session: session}, status: :created
        else
            render json: { error: "User Invalid"}, status: :unauthorized
        end
    end
    def show
        user = User.find(session[:user_id])
        if user
            render json: user
        else
            render json: {error: "Not real"}, status: :unauthorized
        end
    end
end
