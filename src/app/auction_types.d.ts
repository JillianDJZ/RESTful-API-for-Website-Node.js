type Auction = {
    /**
     * Auction id as defined by the database
     */
    auction_id: number,
    /**
     * Auctions title as entered when created
     */
    title: string,
    /**
     * Auctions description as entered when created
     */
    description: string,
    /**
     * Auctions image_filename as entered when created
     */
    image_filename: string,
    /**
     * Auctions end_date as entered when created
     */
    end_date: string,
    /**
     * Auctions reserve as entered when created
     */
    reserve: number,
    /**
     * Auctions seller_id as entered when created
     */
    seller_id: number,
    /**
     * Auctions category_id as entered when created
     */
    category_id: number,
}