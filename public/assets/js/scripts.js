$(document).ready(function () {
    setTimeout(function () {
        $('#start-modal-wrapper').css({
            display: "flex"
        })
    }, 2000);

    var audio = document.getElementById('audioElement');
    // audio.play();

    $("#voice-control-btn").click(function () {
        $(this).toggleClass('stop')
        $(this).toggleClass('play')
        if ($(this).hasClass('play')) {
            audio.play();
        } else {
            audio.pause();
        }
    })

    $("#btn-get-started").click(function () {
        // $("#start-modal-wrapper").removeClass("animate__flipInX").addClass("animate__flipOutX");
        $("#start-modal-wrapper").css({
            display: "none"
        })
        $("#draw-modal-wrapper").css({
            display: "flex"
        })

        audio.play();

    })

    $("#btn-another-design").click(function () {
        $("#draw-modal-wrapper").css({
            display: "flex"
        })

        $("#congratulation-modal-wrapper").css({
            display: "none"
        })

        if ($("#customCheckbox").prop("checked")) {
            $("#customCheckbox").prop("checked", false);
        }

        if (!$("#btn-submit-design").hasClass('disabled')) {
            $("#btn-submit-design").addClass('disabled')
        }

        $("#email").val("")
        $("#twitterHandle").val("")
        $("#twitterError").css({
            'display': 'none'
        })

        var canvas = document.getElementById("canvas");
        const ctx = canvas.getContext('2d');
        clear(ctx)

        $(".swatch-color").each(function () {
            $(this).css({
                "transform": "none"
            })
        })

        $(".swatch-color:first-of-type").css({
            "transform": "scale(1.2)"
        })

    })

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

    $("#customCheckbox").on('change', function () {
        if ($(this).prop("checked")) {
            if ($("#btn-submit-design").hasClass("disabled")) {
                $("#btn-submit-design").removeClass("disabled")
            }
        } else {
            if (!$("#btn-submit-design").hasClass("disabled")) {
                $("#btn-submit-design").addClass("disabled")
            }
        }
    });



    $('#btn-submit-design').on('click', function (e) {
        var email = $("#email").val()
        var twitter = $("#twitterHandle").val()
        var twitterError = $("#twitterError");
        // Check if the Twitter handle includes the "@" symbol
        if (twitter && twitter.indexOf("@") === -1) {
            // Display the error message and prevent form submission
            twitterError.css({
                display: "block"
            })
            // Remove the animation class if it exists
            $(this).removeClass("animate__headShake");

            // Add the animation class to trigger the animation
            $(this).addClass("animate__animated animate__headShake");

        } else {
            if (email && twitter) {
                e.preventDefault();
                var canvas = document.getElementById("canvas");
                canvas.toBlob(function (blob) {
                    var formData = new FormData();
                    formData.append("email", email);
                    formData.append("twitter", twitter);
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
            } else {
                // Remove the animation class if it exists
                $(this).removeClass("animate__headShake");

                // Add the animation class to trigger the animation
                $(this).addClass("animate__animated animate__headShake");

            }
        }
        $(this).one('animationend', function () {
            $(this).removeClass("animate__headShake");
        });
    });

    const textContent = "We’ve endured the crypto winter together, so it’s time to celebrate with the coziest item known to mankind… \n\n Anon.. are you ready to design your own ugly sweater?";
    const liveTextElement = document.getElementById('live-text');
    // Function to simulate the typing effect
    function typeWriter(text, i) {
        if (i < text.length) {
            if (text.charAt(i) === '\n') {
                liveTextElement.innerHTML += '<br>';
            } else {
                liveTextElement.innerHTML += text.charAt(i);
            }
            i++;
            setTimeout(() => typeWriter(text, i), 50); // Adjust the speed here
        }
    }

    setTimeout(() => {
        // Start the typing effect
        typeWriter(textContent, 0);
    }, 3000);

    $("#swatch-clear").click(function () {
        var canvas = document.getElementById("canvas");
        const ctx = canvas.getContext('2d');
        clear(ctx)
    })


    function convertAndDownload(canvas) {
        // Convert canvas to data URL (PNG format)
        var dataURL = canvas.toDataURL("image/png");

        // Convert data URL to Blob
        var byteString = atob(dataURL.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([ab], { type: 'image/jpeg' });

        // Create a downloadable link
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'canvas_image_' + Date.now() + '.jpg';

        // Trigger the click event to start the download
        link.click();
    }

    $("#swatch-download").click(function () {
        var canvas = document.getElementById("canvas");
        convertAndDownload(canvas);
    })
});

