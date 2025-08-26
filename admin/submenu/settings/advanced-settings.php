<?php
/**
 * Render the Advanced Settings page with tabs
 */
// Include tab-specific files

require_once FANCY_POST_GRID_PATH_PRO . 'admin/submenu/settings/includes/appearance-settings.php';
require_once FANCY_POST_GRID_PATH_PRO . 'admin/submenu/settings/includes/additional-settings.php';
require_once FANCY_POST_GRID_PATH_PRO . 'admin/submenu/settings/includes/social-share-settings.php';
require_once FANCY_POST_GRID_PATH_PRO . 'admin/submenu/settings/includes/custom-css-js-settings.php';

function fancy_post_grid_render_advanced_settings_page() {
    ?>
    <div class="fpg-setting-wrapper wrap">
        
        <!-- Tabs navigation -->
        <div class="fancy-grid-nav-tab-wrapper">
            <a href="#fancy-grid-appearance-settings" class="fancy-grid-nav-tab fancy-grid-nav-tab-active">
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="30" height="30" viewBox="0 0 256 256" xml:space="preserve">

                    <defs>
                    </defs>
                    <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                        <path d="M 16.253 90 c -1.72 0 -3.46 -0.275 -5.16 -0.839 c -0.329 -0.109 -0.578 -0.381 -0.658 -0.719 c -0.08 -0.338 0.021 -0.692 0.266 -0.937 l 7.189 -7.189 c 1.096 -1.096 1.7 -2.553 1.7 -4.104 s -0.603 -3.007 -1.699 -4.104 c -2.264 -2.263 -5.946 -2.263 -8.207 0 l -7.189 7.189 c -0.245 0.244 -0.602 0.347 -0.937 0.266 c -0.337 -0.079 -0.609 -0.329 -0.719 -0.658 c -1.945 -5.866 -0.449 -12.215 3.906 -16.57 c 4.463 -4.462 11.051 -5.916 16.948 -3.792 l 36.851 -36.851 c -2.124 -5.9 -0.671 -12.486 3.792 -16.948 c 4.354 -4.355 10.707 -5.852 16.57 -3.906 c 0.329 0.109 0.579 0.381 0.658 0.719 c 0.08 0.337 -0.021 0.692 -0.266 0.937 L 72.11 9.683 c -2.262 2.263 -2.262 5.944 0 8.207 c 1.096 1.096 2.553 1.699 4.104 1.699 c 1.55 0 3.007 -0.603 4.104 -1.7 l 7.189 -7.189 c 0.245 -0.246 0.603 -0.344 0.937 -0.266 c 0.338 0.08 0.609 0.329 0.719 0.658 c 1.946 5.866 0.449 12.215 -3.906 16.57 c -4.463 4.464 -11.048 5.915 -16.948 3.793 L 31.456 68.307 c 2.124 5.899 0.67 12.485 -3.793 16.948 C 24.571 88.348 20.471 90 16.253 90 z M 13.336 87.698 c 4.668 0.974 9.493 -0.436 12.913 -3.857 c 4.051 -4.051 5.274 -10.098 3.115 -15.406 c -0.151 -0.373 -0.065 -0.8 0.219 -1.084 l 37.769 -37.769 c 0.285 -0.285 0.712 -0.371 1.084 -0.219 c 5.307 2.161 11.355 0.936 15.406 -3.115 c 3.42 -3.421 4.829 -8.246 3.857 -12.913 l -5.967 5.967 c -1.473 1.474 -3.433 2.286 -5.517 2.286 c -2.084 0 -4.044 -0.811 -5.517 -2.285 c -3.042 -3.043 -3.042 -7.993 0 -11.035 l 5.967 -5.968 C 71.993 1.33 67.17 2.738 63.749 6.158 c -4.051 4.051 -5.273 10.098 -3.114 15.406 c 0.151 0.372 0.064 0.8 -0.22 1.084 L 22.648 60.416 c -0.285 0.284 -0.712 0.367 -1.084 0.22 c -5.308 -2.162 -11.355 -0.937 -15.406 3.114 c -3.421 3.421 -4.829 8.246 -3.857 12.914 l 5.968 -5.967 c 3.042 -3.042 7.992 -3.042 11.035 0 c 1.474 1.473 2.286 3.433 2.285 5.517 c 0 2.084 -0.812 4.044 -2.286 5.517 L 13.336 87.698 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                        <path d="M 29.621 61.379 c -0.256 0 -0.512 -0.098 -0.707 -0.293 c -0.391 -0.391 -0.391 -1.023 0 -1.414 l 30.758 -30.758 c 0.391 -0.391 1.023 -0.391 1.414 0 c 0.391 0.391 0.391 1.023 0 1.414 L 30.327 61.086 C 30.132 61.281 29.876 61.379 29.621 61.379 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                        <path d="M 79.625 89.833 c -2.654 0 -5.308 -1.01 -7.328 -3.031 L 57.424 71.93 c -0.177 -0.177 -0.28 -0.413 -0.292 -0.662 c -0.155 -3.46 -1.876 -7.076 -4.72 -9.921 c -2.794 -2.793 -6.352 -4.511 -9.76 -4.712 c -0.552 -0.032 -0.972 -0.506 -0.939 -1.056 c 0.032 -0.552 0.505 -0.967 1.056 -0.939 c 3.891 0.228 7.921 2.159 11.057 5.294 c 3.087 3.088 4.996 7.021 5.28 10.851 L 73.71 85.389 c 3.262 3.262 8.57 3.26 11.83 0 c 3.261 -3.262 3.261 -8.568 0 -11.83 L 70.936 58.955 c -3.831 -0.284 -7.764 -2.193 -10.851 -5.28 c -3.135 -3.136 -5.065 -7.166 -5.294 -11.057 c -0.032 -0.551 0.388 -1.024 0.939 -1.056 c 0.539 -0.041 1.024 0.388 1.056 0.939 c 0.201 3.408 1.918 6.966 4.712 9.76 c 2.844 2.844 6.459 4.564 9.921 4.72 c 0.249 0.012 0.485 0.115 0.662 0.292 l 14.873 14.873 c 4.04 4.041 4.04 10.617 0 14.658 C 84.934 88.824 82.279 89.833 79.625 89.833 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                        <path d="M 81.007 81.856 c -0.256 0 -0.512 -0.098 -0.707 -0.293 L 52.382 53.645 c -0.391 -0.391 -0.391 -1.023 0 -1.414 s 1.023 -0.391 1.414 0 l 27.918 27.917 c 0.391 0.391 0.391 1.023 0 1.414 C 81.519 81.758 81.263 81.856 81.007 81.856 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                        <path d="M 39.138 43.512 c -0.256 0 -0.512 -0.098 -0.707 -0.293 l -26.69 -26.69 l -5.818 -1.89 c -0.239 -0.078 -0.44 -0.243 -0.563 -0.462 L 0.138 4.874 c -0.219 -0.391 -0.152 -0.879 0.165 -1.196 l 3.224 -3.223 C 3.843 0.139 4.333 0.071 4.723 0.29 l 9.303 5.221 c 0.219 0.123 0.384 0.324 0.462 0.563 l 1.89 5.818 l 26.69 26.69 c 0.391 0.391 0.391 1.023 0 1.414 c -0.391 0.391 -1.023 0.391 -1.414 0 l -26.859 -26.86 c -0.112 -0.111 -0.195 -0.248 -0.244 -0.398 l -1.843 -5.675 l -8.302 -4.66 L 2.252 4.556 l 4.66 8.302 l 5.675 1.843 c 0.15 0.049 0.287 0.132 0.398 0.244 l 26.86 26.86 c 0.391 0.391 0.391 1.023 0 1.414 C 39.65 43.415 39.394 43.512 39.138 43.512 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                    </g>
                    </svg>
                </div>
                <?php esc_html_e('Appearance Settings', 'fancy-post-grid'); ?>
            </a>
            <a href="#fancy-grid-additional-settings" class="fancy-grid-nav-tab">
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="30" height="30" viewBox="0 0 256 256" xml:space="preserve">
                        <defs></defs>
                        <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                            <path d="M 63.409 90 H 8.08 C 3.625 90 0 86.375 0 81.92 V 8.08 C 0 3.625 3.625 0 8.08 0 h 73.84 C 86.375 0 90 3.625 90 8.08 v 57.44 c 0 0.553 -0.447 1 -1 1 s -1 -0.447 -1 -1 V 8.08 C 88 4.728 85.272 2 81.92 2 H 8.08 C 4.728 2 2 4.728 2 8.08 v 73.84 C 2 85.272 4.728 88 8.08 88 h 55.329 c 0.553 0 1 0.447 1 1 S 63.962 90 63.409 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                            <path d="M 79.181 89.997 c -1.626 0 -3.252 -0.619 -4.489 -1.856 L 52.982 66.433 c -1.323 -1.324 -2.312 -2.971 -2.858 -4.76 l -3.479 -11.384 c -0.316 -1.034 -0.038 -2.151 0.728 -2.916 c 0.765 -0.766 1.887 -1.046 2.916 -0.728 l 11.384 3.479 c 1.789 0.547 3.436 1.535 4.76 2.858 l 21.708 21.709 c 2.476 2.476 2.476 6.503 0 8.979 l -4.471 4.471 C 82.433 89.378 80.807 89.997 79.181 89.997 z M 49.425 48.515 c -0.324 0 -0.545 0.18 -0.638 0.272 c -0.117 0.117 -0.375 0.441 -0.229 0.918 l 3.479 11.384 c 0.452 1.478 1.268 2.836 2.36 3.93 l 21.709 21.708 c 1.695 1.695 4.455 1.695 6.15 0 l 4.471 -4.471 c 1.695 -1.695 1.695 -4.455 0 -6.15 L 65.019 54.396 c -1.094 -1.093 -2.452 -1.908 -3.93 -2.36 l 0 0 l -11.384 -3.479 C 49.604 48.527 49.511 48.515 49.425 48.515 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                            <path d="M 70.886 83.922 c -0.256 0 -0.512 -0.098 -0.707 -0.293 c -0.391 -0.391 -0.391 -1.023 0 -1.414 l 12.036 -12.036 c 0.391 -0.391 1.023 -0.391 1.414 0 s 0.391 1.023 0 1.414 L 71.593 83.629 C 71.397 83.824 71.142 83.922 70.886 83.922 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                            <path d="M 72.719 22 H 17.281 c -0.552 0 -1 -0.448 -1 -1 s 0.448 -1 1 -1 h 55.438 c 0.553 0 1 0.448 1 1 S 73.271 22 72.719 22 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                            <path d="M 72.719 38 H 17.281 c -0.552 0 -1 -0.448 -1 -1 s 0.448 -1 1 -1 h 55.438 c 0.553 0 1 0.448 1 1 S 73.271 38 72.719 38 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                            <path d="M 32.719 54 H 17.281 c -0.552 0 -1 -0.447 -1 -1 s 0.448 -1 1 -1 h 15.438 c 0.552 0 1 0.447 1 1 S 33.271 54 32.719 54 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                            <path d="M 42.719 70 H 17.281 c -0.552 0 -1 -0.447 -1 -1 s 0.448 -1 1 -1 h 25.438 c 0.552 0 1 0.447 1 1 S 43.271 70 42.719 70 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                        </g>
                    </svg>
                </div>
                <?php esc_html_e('Additional Settings', 'fancy-post-grid'); ?>
            </a>
            <a href="#fancy-grid-social-share-settings" class="fancy-grid-nav-tab">
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="30" height="30" viewBox="0 0 256 256" xml:space="preserve">
                        <defs></defs>
                        <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                            <path d="M 80.116 45.805 c -2.318 0 -4.312 1.398 -5.194 3.393 l -14.931 -3.612 c 0.131 -0.777 0.215 -1.57 0.215 -2.384 c 0 -3.462 -1.235 -6.641 -3.287 -9.121 l 18.33 -19.499 c 1.334 0.976 2.973 1.559 4.749 1.559 c 4.45 0 8.071 -3.621 8.071 -8.071 S 84.449 0 79.999 0 s -8.07 3.621 -8.07 8.071 c 0 1.955 0.699 3.749 1.86 5.147 l -18.26 19.424 c -2.549 -2.332 -5.931 -3.768 -9.65 -3.768 c -3.563 0 -6.82 1.316 -9.329 3.477 L 21.709 17.35 c 0.653 -0.925 1.041 -2.05 1.041 -3.266 c 0 -3.131 -2.547 -5.678 -5.678 -5.678 s -5.678 2.547 -5.678 5.678 s 2.547 5.678 5.678 5.678 c 1.194 0 2.302 -0.372 3.217 -1.005 L 35.131 33.76 c -2.22 2.525 -3.579 5.824 -3.579 9.443 c 0 2.553 0.679 4.946 1.854 7.024 L 16.13 61.613 c -1.481 -1.731 -3.677 -2.833 -6.129 -2.833 c -4.45 0 -8.071 3.62 -8.071 8.07 s 3.621 8.071 8.071 8.071 s 8.071 -3.621 8.071 -8.071 c 0 -1.281 -0.308 -2.49 -0.842 -3.567 l 17.283 -11.392 c 2.621 3.42 6.734 5.639 11.366 5.639 c 1.639 0 3.208 -0.29 4.676 -0.799 l 5.693 15.815 c -3.053 1.499 -5.164 4.631 -5.164 8.254 c 0 5.072 4.127 9.199 9.199 9.199 s 9.198 -4.127 9.198 -9.199 s -4.126 -9.199 -9.198 -9.199 c -0.743 0 -1.462 0.098 -2.155 0.265 l -5.731 -15.921 c 3.37 -1.731 5.973 -4.75 7.137 -8.412 l 14.922 3.609 c -0.007 0.113 -0.017 0.226 -0.017 0.341 c 0 3.131 2.547 5.679 5.678 5.679 s 5.679 -2.548 5.679 -5.679 S 83.247 45.805 80.116 45.805 z M 10.001 72.921 c -3.348 0 -6.071 -2.724 -6.071 -6.071 s 2.723 -6.07 6.071 -6.07 s 6.071 2.723 6.071 6.07 S 13.349 72.921 10.001 72.921 z M 67.481 80.801 c 0 3.97 -3.229 7.199 -7.198 7.199 c -3.97 0 -7.199 -3.229 -7.199 -7.199 s 3.229 -7.199 7.199 -7.199 C 64.252 73.602 67.481 76.831 67.481 80.801 z M 79.999 2 c 3.348 0 6.071 2.723 6.071 6.071 s -2.724 6.071 -6.071 6.071 s -6.07 -2.723 -6.07 -6.071 S 76.651 2 79.999 2 z M 13.394 14.084 c 0 -2.028 1.65 -3.678 3.678 -3.678 s 3.678 1.65 3.678 3.678 s -1.65 3.678 -3.678 3.678 S 13.394 16.112 13.394 14.084 z M 45.879 55.53 c -6.797 0 -12.328 -5.53 -12.328 -12.328 s 5.53 -12.328 12.328 -12.328 c 6.798 0 12.328 5.53 12.328 12.328 S 52.677 55.53 45.879 55.53 z M 80.116 55.162 c -2.028 0 -3.678 -1.65 -3.678 -3.679 s 1.649 -3.679 3.678 -3.679 s 3.679 1.65 3.679 3.679 S 82.145 55.162 80.116 55.162 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                        </g>
                    </svg>
                </div>
                <?php esc_html_e('Social Share', 'fancy-post-grid'); ?>
            </a>
            <a href="#fancy-grid-custom-css-js-settings" class="fancy-grid-nav-tab">
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" x="0" y="0" viewBox="0 0 482600 482600" style="enable-background:new 0 0 512 512" xml:space="preserve" fill-rule="evenodd" class=""><g><g fill="#A3ACB9" fill-rule="nonzero"><path d="m318284 111757-2993-2993 5986-5986 2993 2993 132537 132536 2993 2993-5986 5986-2993-2993z" fill="#A3ACB9" opacity="1" data-original="#191919"></path><path d="m324270 376829-2993 2993-5986-5986 2993-2993 132536-132536 2993-2993 5986 5986-2993 2993zM158330 105771l2993-2993 5986 5986-2993 2993L31780 244293l-2993 2993-5986-5986 2993-2993z" fill="#A3ACB9" opacity="1" data-original="#191919"></path><path d="m164317 370843 2993 2993-5986 5986-2993-2993L25795 244293l-2993-2993 5986-5986 2993 2993zM306930 48640l1439-3969 7938 2878-1439 3969-139198 382442-1439 3969-7938-2878 1439-3969z" fill="#A3ACB9" opacity="1" data-original="#191919"></path></g></g></svg>
                </div>
                <?php esc_html_e('Custom CSS/JavaScript', 'fancy-post-grid'); ?>
            </a>
        </div>

        <!-- Tab contents -->
        <div id="fancy-grid-appearance-settings" class="fancy-grid-tab-content fancy-grid-active">
            <?php fancy_post_grid_render_appearance_settings(); ?>
        </div>

        <div id="fancy-grid-additional-settings" class="fancy-grid-tab-content">
            <?php fancy_post_grid_render_additional_settings(); ?>
        </div>

        <div id="fancy-grid-social-share-settings" class="fancy-grid-tab-content">
            <?php fancy_post_grid_render_social_share_settings(); ?>
        </div>

        <div id="fancy-grid-custom-css-js-settings" class="fancy-grid-tab-content">
            <?php fancy_post_grid_render_custom_css_js_settings(); ?>
        </div>
    </div>
    <?php
}
