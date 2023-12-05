

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
        var canvas = document.getElementById('canvas');
        var imageDataUrl = canvas.toDataURL('image/png'); // or 'image/jpeg'
        var formData = {
            email: $('#email').val(),
            twitter: $('#twitterHandle').val(),
            image: imageDataUrl
        };

        $.ajax({
            type: 'POST',
            url: 'https://agoric-ugly-sweater.vercel.app/api/submitData',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (response) {
                console.log(response);
            },
            error: function (err) {
                console.log(err);
            }
        });
    });

});