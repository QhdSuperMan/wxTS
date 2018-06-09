(function(){

    var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;

    var container;
    var camera, scene, renderer;

    var particles, particle, count = 0;

    var mouseX = - window.innerWidth / 2, mouseY = - window.innerHeight / 2;

    var windowHalfX = window.innerWidth;
    var windowHalfY = window.innerHeight;

    init();
    animate();

    function init() {
        container = document.getElementsByClassName('bg3d')[0];
        container.style.height = windowHalfY - 80 + 'px';

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 1000;
        scene = new THREE.Scene();

        particles = new Array();

        var PI2 = Math.PI * 2;
        var material = new THREE.ParticleCanvasMaterial( {

            color: 0xffffff,
            program: function ( context ) {

                context.beginPath();
                context.arc( 0, 0, 1, 0, PI2, true );
                context.fill();

            }

        } );

        var i = 0;

        for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

            for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

                particle = particles[ i ++ ] = new THREE.Particle( material );
                particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
                particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
                scene.add( particle );

            }

        }
        renderer = new THREE.CanvasRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );

        container.addEventListener( 'mousemove', onDocumentMouseMove, false );
        container.addEventListener( 'touchstart', onDocumentTouchStart, false );
        container.addEventListener( 'touchmove', onDocumentTouchMove, false );

        //

        window.addEventListener( 'resize', onWindowResize, false );

    }

    function onWindowResize() {

        windowHalfX = window.innerWidth / 1;
        windowHalfY = window.innerHeight / 1;
        container.style.height = windowHalfY - 80 + 'px';
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth , window.innerHeight * 0.8);

    }

    //

    function onDocumentMouseMove( event ) {

        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;

    }

    function onDocumentTouchStart( event ) {

        if ( event.touches.length === 1 ) {

            event.preventDefault();

            mouseX = event.touches[ 0 ].pageX - windowHalfX;
            mouseY = event.touches[ 0 ].pageY - windowHalfY;

        }

    }

    function onDocumentTouchMove( event ) {

        if ( event.touches.length === 1 ) {

            event.preventDefault();

            mouseX = event.touches[ 0 ].pageX - windowHalfX;
            mouseY = event.touches[ 0 ].pageY - windowHalfY;

        }

    }
    //

    function animate() {

        requestAnimationFrame( animate );

        render();
        
    }

    function render() {

        camera.position.x += ( mouseX - camera.position.x ) * .05;
        camera.position.y += ( - mouseY - camera.position.y ) * .05;
        camera.lookAt( scene.position );
        var i = 0;

        for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

            for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

                particle = particles[ i++ ];
                particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) + ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
                particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 2 + ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 2;

            }

        }

        renderer.render( scene, camera );

        count += 0.1;

    }
})()