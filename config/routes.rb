Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  resources :user
  resources :sale
  resources :item
  resources :buyer
  resources :seller
  post "/login", to: "session#create"
  patch "/bidtime/:id", to: "sale#updateBiding"
  get "/saleshighestBid/:id", to: "sale#findHighestBid"
  get "/sellermatchuser/:id", to: "seller#sellermatchuser"
  get "/userbysale/:id", to: "user#userbysale"
  get "/salesUser", to: "sale#saleUser"
  get "/userSales", to: "sale#userSales"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
