class SaleController < ApplicationController
    def create
        b = session[:user_id]
        c = Seller.find_by(user_id: b)
        saled = Sale.create!(seller_id: c.id, item_id: sales_params[:item_id], bid: sales_params[:bid], starting_bid: sales_params[:starting_bid], bid_time: sales_params[:bid_time], bid_length: sales_params[:bid_length])
        render json: saled, status: 201
    end
    def index
        sales = Sale.all
        render json: sales, status: 201
    end
    def show
        sales = Sale.find(params[:id])
        render json: sales, status: 201
    end
    def update
        sale = Sale.find(params[:id])
        render json: {error: 5}, status: 200
    end
    def destroy
        sale = Sale.find(params[:id])
        sale.destroy
        head :no_content
    end
    def findHighestBid
        sale = Sale.find(params[:id])
        highest_bidsss = sale.buyer.order(:buy_price).last
        if(highest_bidsss.buy_price >= sale.bid)
            render json: {greater: true, highest_bid: highest_bidsss}, include: ["user"], status: 200
        else
            render json: {greater: false}, status: 200
        end
    end
    def updateBiding
        sale = Sale.find(params[:id])
        buyer = sale.buyer.find_by!(user_id: session[:user_id])
        buyer.update(buy_price: params[:bidet])
        Sale.find(params[:id]).update(bid: params[:bidet])
        render json: {buyer: buyer, biyer: Buyer.find(buyer.id), sale: sale, slae: Sale.find(params[:id])}, status: 202
    rescue ActiveRecord::RecordNotFound => invalid
        sale = Sale.find(params[:id])
        buyer = Buyer.create!(item_id: params[:item_id], sale_id: params[:id], buy_price: params[:bidet], buy_time: (String(Time.now).split(/[-:]/)[0] + String(Time.now).split(/[-:]/)[1] + String(Time.now).split(/[-:]/)[2].sub(/ /, "") + "." + String(Time.now).split(/[-:]/)[3].sub(/ /, "")), user_id: session[:user_id])
        Sale.find(params[:id]).update(bid: params[:bidet])
        render json: {buyer: buyer, sale: sale, slae: Sale.find(params[:id])}, status: 202
    end
    def saleUser
        if(session[:user_id])
            b = Seller.find_by!(user_id: session[:user_id])
            sales = Sale.where.not(seller_id: b).limit(30)
            render json: sales, status: 201
        else
            sales = Sale.all.limit(30)
            render json: sales, status: 201
        end
    end
    def userSales
        b = Seller.find_by!(user_id: session[:user_id])
        sales = Sale.where(seller_id: b).limit(30)
        render json: sales, status: 201
    private
    def sales_params
        params.permit(:seller_id, :item_id, :bid, :starting_bid, :bid_time, :bid_length)
    end 
end
