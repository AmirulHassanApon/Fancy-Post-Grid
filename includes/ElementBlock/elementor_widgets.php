<?php
add_action('elementor/widgets/widgets_registered', function () {
    class Ultimate_Team_Elementor_Post_Widget extends \Elementor\Widget_Base {
        public function get_name() {
            return 'ufpg-elementor-post-widget';
        }
        public function get_title() {
            return __('Fancy Post Grid', 'fancy-post-grid');
        }
        public function get_icon() {
            return 'eicon-posts-grid'; 
        }
        

        public function get_categories() {
            return array( 'basic' );
        }

        public function fancy_post_list() {
            $post_list  = array();
            $fancy_posts = new \WP_Query(
                array(
                    'post_type'      => 'fancy-post-grid-fpg',
                    'post_status'    => 'publish',
                    'posts_per_page' => 9999,
                )
            );
            $posts      = $fancy_posts->posts;
            foreach ( $posts as $post ) {
                $post_list[ $post->ID ] = $post->post_title;
            }
            krsort( $post_list );
            return $post_list;
        }


        /**
         * Controls register.
         *
         * @return void
         */
        protected function register_controls() {
            $this->start_controls_section(
                'content_section',
                array(
                    'label' => __( 'Content', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
                )
            );

            $this->add_control(
                'fancy_post_grid_pro_shortcode',
                array(
                    'label'       => __( 'Fancy Post Grid Shortcode(s)', 'fancy-post-grid' ),
                    'type'        => \Elementor\Controls_Manager::SELECT2,
                    'label_block' => true,
                    'default'     => '',
                    'options'     => $this->fancy_post_list(),
                )
            );

            $this->end_controls_section();

        }

        protected function render() {
            $settings       = $this->get_settings_for_display();
            $ufpg_shortcode = $settings['fancy_post_grid_pro_shortcode'];

            if ('' === $ufpg_shortcode) {
                echo '<div style="text-align: center; margin-top: 0; padding: 10px" class="elementor-add-section-drag-title">Select a shortcode</div>';
                return;
            }

            $generator_id = (int) esc_attr($ufpg_shortcode);

            if (\Elementor\Plugin::$instance->editor->is_edit_mode()) {

                // Render the shortcode for a live preview.
                echo do_shortcode('[fancy_gird_post_shortcode id="' . $generator_id . '"]');        
            }
            else {
            // Render the shortcode on the frontend.
            echo do_shortcode('[fancy_gird_post_shortcode id="' . $generator_id . '"]');
            }
        }

    }
    \Elementor\Plugin::instance()->widgets_manager->register_widget_type(new Ultimate_Team_Elementor_Post_Widget());
});