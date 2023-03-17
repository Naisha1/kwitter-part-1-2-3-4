var firebaseConfig = {
      apiKey: "AIzaSyClp7lbjJX50ke0ptuBA3N23BP5UvyUt_A",
      authDomain: "kwitter-46d1d.firebaseapp.com",
      databaseURL: "https://kwitter-46d1d-default-rtdb.firebaseio.com",
      projectId: "kwitter-46d1d",
      storageBucket: "kwitter-46d1d.appspot.com",
      messagingSenderId: "29462929917",
      appId: "1:29462929917:web:33eaf50815c7f497ac7994"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome" + user_name + "!";

function addRoom()
{
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose : "adding room name"
  });

    localStorage.setItem("room_name", room_name);
    
    window.location = "kwitter_page.html";
}

function getData() {  
  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { 
    childKey  = childSnapshot.key;
       Room_names = childKey;
       console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
    window.location = "kwitter.html";
}

function updateLike(message_id)
{
  console.log("clicked on log button - " + message_id);
  button_id = message_id;
  likes = document.getElementById(button_id).value
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);

  firebase.database().ref(room_name).child(message_id).update({
    like : updated_likes
  });
}