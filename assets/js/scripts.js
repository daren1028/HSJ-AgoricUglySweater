var API_KEY = 'AIzaSyCbjmWnDygEhRKO8khbE6n1BowwvW_YMiA';
var SPREADSHEET_ID = '1IEg9T_HyTGlnxp4zBs9fiZWAMhzI3pGA70TAYDxHCgg';
var SHEET_NAME = 'Sheet1';
const CLIENT_ID = '657416883280-7h3g43eftigjdq7lebjp7e6lrvcbvft2.apps.googleusercontent.com';

$(document).ready(function () {
    setTimeout(function () {
        $('#start-modal-wrapper').css({
            display: "flex"
        })
    }, 500);

    $("#btn-get-started").click(function () {
        $("#start-modal-wrapper").removeClass("animate__flipInX").addClass("animate__flipOutX");
        setTimeout(function () {
            $("#start-modal-wrapper").css({
                display: "none"
            })
            $("#draw-modal-wrapper").css({
                display: "flex"
            })
        }, 1000); // Adjust the delay as needed to match the duration of the animation
    })

    $("#btn-get-started").hover(
        function () {
            $(this).addClass("animate__animated animate__headShake");
        },
        function () {
            $(this).removeClass("animate__animated animate__headShake");
        }
    );

    $("#voice-control-btn").hover(
        function () {
            $(this).addClass("animate__animated animate__pulse");
        },
        function () {
            $(this).removeClass("animate__animated animate__pulse");
        }
    );

    $(".swatch-color:first-of-type").css({
        "transform": "scale(1.2)"
    })

    $(".swatch-container").on("click", ".swatch-color", function () {
        $(".swatch-color").each(function () {
            $(this).css({
                "transform": "none"
            })
        })

        $(this).css({
            "transform": "scale(1.2)"
        })
    })

    $('form').on('submit', function (e) {
        e.preventDefault();
        gapi.load('client:auth2', initClient);
    });

    function initClient() {
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
            scope: "https://www.googleapis.com/auth/spreadsheets",
        }).then(function () {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

            // Handle the initial sign-in state.
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    }

    function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
            // User is signed in.
            submitForm();
        } else {
            // User is not signed in. Start Google OAuth flow.
            gapi.auth2.getAuthInstance().signIn();
        }
    }

    function submitForm() {
        var canvas = document.getElementById('canvas');
        var imageDataUrl = canvas.toDataURL('image/png'); // or 'image/jpeg'
        var formData = {
            'email': $('#email').val(),
            'twitter': $('#twitterHandle').val(),
            'image': imageDataUrl
        };

        gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!A1`,
            valueInputOption: "USER_ENTERED",
            resource: { formData },
        }).then(
            function (response) {
                console.log('Form submitted successfully', response);
            },
            function (error) {
                console.error('Error submitting form', error);
            }
        );
    }

    // $('form').on('submit', function (e) {
    //     e.preventDefault();
    //     var canvas = document.getElementById('canvas');
    //     var imageDataUrl = canvas.toDataURL('image/png'); // or 'image/jpeg'
    //     var formData = {
    //         'email': $('#email').val(),
    //         'twitter': $('#twitterHandle').val(),
    //         'image': imageDataUrl
    //     };

    //     $.ajax({
    //         type: 'POST',
    //         url: `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A1:append`,
    //         contentType: 'application/json',
    //         headers: {
    //             'Authorization': `Bearer ${YOUR_API_KEY}`,
    //             'Content-Type': 'application/json'
    //         },
    //         data: JSON.stringify({
    //             "values": [
    //                 [formData.email, formData.twitter, formData.image]
    //             ]
    //         }),
    //         success: function (response) {
    //             console.log(response);
    //         },
    //         error: function (err) {
    //             console.log(err);
    //         }
    //     });
    // });
    var isPlaying = false;
    var bgAudio = new Audio('./assets/audio/bgAudio.mp3');

    $("#voice-control-btn").click(function () {
        if (isPlaying) {
            bgAudio.pause();
            isPlaying = false;
        } else {
            bgAudio.play();
            isPlaying = true;
        }
    })

});

