class ApiResponse {
    status: Number 
    data: Object 
    readonly success: Boolean = true
    message: String 

    constructor(status: Number, data: Object, message: String = "success"){
        this.status = status, 
        this.data = data, 
        this.message = message, 
        this.success = true
    }
}

export {ApiResponse}