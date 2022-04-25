type User = {
    /**
     * User id as defined by the database
     */
    user_id: number,
    /**
     * User email as entered when created
     */
    email: string,
    /**
     * User first_name as entered when created
     */
    first_name: string,
    /**
     * User last_name as entered when created
     */
    last_name: string,
    /**
     * User image_filename as entered when created
     */
    image_filename: string,
    /**
     * User password as entered when created
     */
    password: string,
    /**
     * User auth_token as entered when created
     */
    auth_token: string
}