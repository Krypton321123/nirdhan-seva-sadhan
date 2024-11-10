class ApiError  {
    status: Number 
    message: String 
    data?: Object 
    readonly success: false



    constructor(status: Number, message: String = "Something went wrong", data?: Object,) {
        // super(message) 
        this.message = message, 
        this.status = status, 
        this.data = data, 
        this.success = false 
    }
}

export { ApiError };  