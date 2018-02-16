def format_response(status, data, message=""):
    return {
        "error": 0 if status else 1,
        "message": message,
        "data": data
    }
