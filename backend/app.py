from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({"error": "Message not provided"}), 400
    
    user_message = data['message']
    mock_reply = f"This is a mock backend response to your message: {user_message}"
    return jsonify({"reply": mock_reply})

if __name__ == '__main__':
    app.run(debug=True)
