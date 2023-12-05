$(document).ready(function () {
    setTimeout(function () {
        $('#start-modal-wrapper').css({
            display: "flex"
        })
    }, 500);

    $("#btn-get-started").click(function () {
        // $("#start-modal-wrapper").removeClass("animate__flipInX").addClass("animate__flipOutX");
        $("#start-modal-wrapper").css({
            display: "none"
        })
        $("#draw-modal-wrapper").css({
            display: "flex"
        })
    })

    $("#btn-another-design").click(function () {
        $("#draw-modal-wrapper").css({
            display: "flex"
        })

        $("#congratulation-modal-wrapper").css({
            display: "none"
        })
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

    var audio = document.getElementById('audioElement');
    $("#voice-control-btn").click(function () {
        $(this).toggleClass('play')
        $(this).toggleClass('stop')
        if ($(this).hasClass('play')) {
            audio.pause();
        } else {
            audio.play();
        }
    })

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



    $('form.submit-design-form').on('submit', function (e) {
        e.preventDefault();
        var canvas = document.getElementById("canvas");
        canvas.toBlob(function (blob) {
            var formData = new FormData();
            debugger
            formData.append("email", $("#email").val());
            formData.append("twitter", $("#twitterHandle").val());
            formData.append("file", blob, "canvas_image_" + Date.now() + ".bmp");

            $.ajax({
                url: "/submit", // Replace with your server endpoint
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    $("#congratulation-modal-wrapper").css({
                        display: "flex"
                    })
                    $("#draw-modal-wrapper").css({
                        display: "none"
                    })
                },
                error: function (error) {
                    console.error("Error uploading file", error);
                },
            });

        }, "image/bmp");

    });
});

