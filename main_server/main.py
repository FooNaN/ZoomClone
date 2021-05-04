from flask import Flask, request
app = Flask(__name__)

@app.route("/create_room", methods=["POST"])
def create_room():
    """
    input JSON structure:
    {
        peer_id: <int>
    }

    output JSON structure:
    {
        room_id: <int>
    }
    """
    json = request.get_json()
    peer_id = json["peer_id"]
    # do room creation here
    room_id = 1 # placeholder
    return {"room_id": room_id}

@app.route("/connect_peer", methods=["POST"])
def connect_peer():
    """
    input JSON structure:
    {
        peer_id: <int>
        room_id: <int>
    }
    """
    json = request.get_json()
    peer_id = json["peer_id"]
    room_id = json["peer_id"]
    # do peer connection here
    return "connect_peer"

if __name__ == "__main__":
    app.run()
