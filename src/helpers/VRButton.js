import { ref } from "vue";

class VRButton{

	constructor( renderer ) {
        this.renderer = renderer;
        
        if ( 'xr' in navigator ) {

			const button = document.createElement( 'button' );
            button.id = 'VRButton';
			button.style.display = 'none';
            button.style.height = '40px';

			navigator.xr.isSessionSupported( 'immersive-vr' ).then( ( supported ) => {

				supported ? this.showEnterVR( button ) : this.showWebXRNotFound( button );

			} );
            
            document.body.appendChild( button );

		} else {

			const message = document.createElement( 'a' );

			if ( window.isSecureContext === false ) {

				message.href = document.location.href.replace( /^http:/, 'https:' );
				message.innerHTML = 'WEBXR NEEDS HTTPS'; 

			} else {

				message.href = 'https://immersiveweb.dev/';
				message.innerHTML = 'WEBXR NOT AVAILABLE';

			}

			message.style.left = '0px';
			message.style.width = '100%';
			message.style.textDecoration = 'none';

			this.stylizeElement( message, false );
            message.style.bottom = '0px';
            message.style.opacity = '1';
            
            document.body.appendChild ( message );

		}

    }

	showEnterVR( button ) {

        let currentSession = null;
        const self = this;
        
        this.stylizeElement( button, true, 30, true );
        
        function onSessionStarted( session ) {

            session.addEventListener( 'end', onSessionEnded );

            // self.renderer.xr.setReferenceSpaceType( 'unbounded' );
            self.renderer.xr.setSession( session );
            self.stylizeElement( button, false, 12, true );
            
            button.textContent = 'EXIT VR';

            currentSession = session;

        }

        function onSessionEnded( ) {

            currentSession.removeEventListener( 'end', onSessionEnded );

            self.stylizeElement( button, true, 12, true );
            button.textContent = 'ENTER VR';

            currentSession = null;

        }

        //

        button.style.display = '';
        button.style.right = '20px';
        button.style.width = '80px';
        button.style.cursor = 'pointer';
        button.innerHTML = '<svg style="width: 40px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>virtual-reality</title><path class="h-fit" d="M5,3C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3H5M6,9H7.5L8.5,12.43L9.5,9H11L9.25,15H7.75L6,9M13,9H16.5C17.35,9 18,9.65 18,10.5V11.5C18,12.1 17.6,12.65 17.1,12.9L18,15H16.5L15.65,13H14.5V15H13V9M14.5,10.5V11.5H16.5V10.5H14.5Z" /></svg>';
        

        button.onmouseenter = function () {
            
            button.style.fontSize = '12px'; 
            button.textContent = (currentSession===null) ? 'ENTER VR' : 'EXIT VR';
            button.style.opacity = '1.0';

        };

        button.onmouseleave = function () {
            
            button.style.fontSize = '30px'; 
            button.innerHTML = '<svg style="width: 40px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>virtual-reality</title><path class="h-fit" d="M5,3C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3H5M6,9H7.5L8.5,12.43L9.5,9H11L9.25,15H7.75L6,9M13,9H16.5C17.35,9 18,9.65 18,10.5V11.5C18,12.1 17.6,12.65 17.1,12.9L18,15H16.5L15.65,13H14.5V15H13V9M14.5,10.5V11.5H16.5V10.5H14.5Z" /></svg>';
            button.style.opacity = '0.5';

        };

        button.onclick = function () {

            if ( currentSession === null ) {

                // WebXR's requestReferenceSpace only works if the corresponding feature
                // was requested at session creation time. For simplicity, just ask for
                // the interesting ones as optional features, but be aware that the
                // requestReferenceSpace call will fail if it turns out to be unavailable.
                // ('local' is always available for immersive sessions and doesn't need to
                // be requested separately.)

                var sessionInit = { requiredFeatures: [ 'viewer' ], optionalFeatures: [ 'local-floor', 'bounded-floor', 'unbounded' ] };
                navigator.xr.requestSession( 'immersive-vr', sessionInit ).then( onSessionStarted );

            } else {

                currentSession.end();

            }

        };

    }

    disableButton(button) {

        button.style.cursor = 'auto';
        button.style.opacity = '0.5';
        
        button.onmouseenter = null;
        button.onmouseleave = null;

        button.onclick = null;

    }

    showWebXRNotFound( button ) {
        this.stylizeElement( button, false );
        
        this.disableButton(button);

        button.style.display = '';
        button.style.width = '100%';
        button.style.right = '0px';
        button.style.bottom = '0px';
        button.style.border = '';
        button.style.opacity = '1';
        button.style.fontSize = '13px';
        button.textContent = 'VR NOT SUPPORTED';

    }

    stylizeElement( element, active = true, fontSize = 13, ignorePadding = false ) {

        element.style.position = 'absolute';
        element.style.bottom = '20px';
        if (!ignorePadding) element.style.padding = '12px 6px';
        element.style.border = '1px solid #fff';
        element.style.borderRadius = '4px';
        element.style.background = (active) ? 'rgba(20,150,80,1)' : 'rgba(180,20,20,1)';
        element.style.color = '#fff';
        element.style.font = `normal ${fontSize}px sans-serif`;
        element.style.textAlign = 'center';
        element.style.opacity = '0.5';
        element.style.outline = 'none';
        element.style.zIndex = '999';

    }

	
};

export { VRButton };
