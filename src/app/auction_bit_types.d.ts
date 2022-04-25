type AuctionBid = {
    /**
     * Auction bid id as defined by the database
     */
    auction_bid_id: number,
    /**
     * Auctions id as entered when created
     */
    auction_id: number,
    /**
     * user id as entered when created
     */
    user_id: number,
    /**
     * Auction bid amount as entered when created
     */
    amount: number,
    /**
     * Auctions bid datetime as entered when created
     */
    timestamp: string
}