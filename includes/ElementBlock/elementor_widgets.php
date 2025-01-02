<?php

add_action('elementor/elements/categories_registered', function ($elements_manager) {
    $elements_manager->add_category(
        'fancy-post-grid-category',
        array(
            'title' => __('Fancy Post Grid', 'fancy-post-grid'),
            'icon'  => 'fa fa-th', // Optional icon for the category
        ),
        100 // Priority set to 0 to place it at the top
    );
});

add_action('elementor/widgets/widgets_registered', function () {
    // Base class for all Fancy Post Grid Layout Widgets
    abstract class Fancy_Post_Grid_Base_Widget extends \Elementor\Widget_Base {

        // Property to hold the controls to exclude
        protected $exclude_controls = [];

        // Get categories
        public function get_categories_list() {
            $categories = get_categories();
            $category_list = [];
            foreach ($categories as $category) {
                $category_list[$category->term_id] = $category->name;
            }
            return $category_list;
        }

        // Get tags
        public function get_tags_list() {
            $tags = get_tags();
            $tag_list = [];
            foreach ($tags as $tag) {
                $tag_list[$tag->term_id] = $tag->name;
            }
            return $tag_list;
        }

        // Get authors
        public function get_authors_list() {
            $authors = get_users(array('capability' => 'edit_posts',));
            $author_list = [];
            foreach ($authors as $author) {
                $author_list[$author->ID] = $author->display_name;
            }
            return $author_list;
        }

        // All Register Control
        protected function register_controls() {
            // Layout Section
            $this->start_controls_section(
                'layout_section',
                array(
                    'label' => __( 'Layout', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
                )
            );

            // Add control for Grid Layout selection 
            // Check if the control is excluded before adding it
            if (!in_array('fancy_post_grid_layout', $this->exclude_controls)) {
                $this->add_control(
                    'fancy_post_grid_layout',
                    [                    
                        'label'   => __( 'Grid Style', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'options' => array(
                            'gridstyle01' => __( 'Grid Style 01', 'fancy-post-grid' ),
                            'gridstyle02' => __( 'Grid Style 02', 'fancy-post-grid' ),
                            'gridstyle03' => __( 'Grid Style 03', 'fancy-post-grid' ),
                            'gridstyle04' => __( 'Grid Style 04', 'fancy-post-grid' ),
                            'gridstyle05' => __( 'Grid Style 05', 'fancy-post-grid' ),
                            'gridstyle06' => __( 'Grid Style 06', 'fancy-post-grid' ),
                            'gridstyle07' => __( 'Grid Style 07', 'fancy-post-grid' ),
                            'gridstyle08' => __( 'Grid Style 08', 'fancy-post-grid' ),
                            'gridstyle09' => __( 'Grid Style 09', 'fancy-post-grid' ),
                            'gridstyle10' => __( 'Grid Style 10', 'fancy-post-grid' ),
                            'gridstyle11' => __( 'Grid Style 11', 'fancy-post-grid' ),
                            'gridstyle12' => __( 'Grid Style 12', 'fancy-post-grid' ),
                        ),
                        'default' => 'gridstyle01',
                    ]
                );
            }
            // Add control for Slider Layout selection 
            // Check if the control is excluded before adding it
            if (!in_array('fancy_post_slider_layout', $this->exclude_controls)) {
                $this->add_control(
                    'fancy_post_slider_layout',
                    [                    
                        'label'   => __( 'Slider Style', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'options' => array(
                            'sliderstyle01' => __( 'Slider Style 01', 'fancy-post-grid' ),
                            'sliderstyle02' => __( 'Slider Style 02', 'fancy-post-grid' ),
                            'sliderstyle03' => __( 'Slider Style 03', 'fancy-post-grid' ),
                            'sliderstyle04' => __( 'Slider Style 04', 'fancy-post-grid' ),
                            'sliderstyle05' => __( 'Slider Style 05', 'fancy-post-grid' ),
                            'sliderstyle06' => __( 'Slider Style 06', 'fancy-post-grid' ),
                            'sliderstyle07' => __( 'Slider Style 07', 'fancy-post-grid' ),
                            
                        ),
                        'default' => 'sliderstyle01',
                    ]
                );
            }

            if (!in_array('fancy_post_slider_layout-NEW', $this->exclude_controls)) {
    $this->add_control(
    'fancy_post_slider_layout-NEW',
    [
        'label'       => __( 'Slider Style NEW', 'fancy-post-grid' ),
        'type'        => \Elementor\Controls_Manager::CHOOSE,
        'label_block' => true, // Ensure label is always visible
        'options'     => [
            'sliderstyle01' => [
                'title' => __( 'Style 01', 'fancy-post-grid' ),
                
            ],
            'sliderstyle02' => [
                'title' => __( 'Style 02', 'fancy-post-grid' ),
                'icon'  => 'dashicons dashicons-images-alt2',
            ],
            'sliderstyle03' => [
                'title' => __( 'Style 03', 'fancy-post-grid' ),
                'icon'  => 'dashicons dashicons-format-image',
            ],
            'sliderstyle04' => [
                'title' => __( 'Style 04', 'fancy-post-grid' ),
                'icon'  => 'dashicons dashicons-slides',
            ],
            'sliderstyle05' => [
                'title' => __( 'Style 05', 'fancy-post-grid' ),
                'icon'  => 'dashicons dashicons-format-aside',
            ],
            'sliderstyle06' => [
                'title' => __( 'Style 06', 'fancy-post-grid' ),
                'icon'  => 'dashicons dashicons-screenoptions',
            ],
            'sliderstyle07' => [
                'title' => __( 'Style 07', 'fancy-post-grid' ),
                'icon'  => 'dashicons dashicons-format-video',
            ],
        ],
        'toggle'      => false, // Disables collapsing toggle behavior
        'default'     => 'sliderstyle01',
    ]
);

}

            // Add control for Isotope Layout selection 
            // Check if the control is excluded before adding it
            if (!in_array('fancy_post_isotope_layout', $this->exclude_controls)) {
                $this->add_control(
                    'fancy_post_isotope_layout',
                    [                    
                        'label'   => __( 'Isotope Style', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'options' => array(
                            'isotopestyle01' => __( 'Isotope Style 01', 'fancy-post-grid' ),
                            'isotopestyle02' => __( 'Isotope Style 02', 'fancy-post-grid' ),
                            'isotopestyle03' => __( 'Isotope Style 03', 'fancy-post-grid' ),
                            'isotopestyle04' => __( 'Isotope Style 04', 'fancy-post-grid' ),
                            'isotopestyle05' => __( 'Isotope Style 05', 'fancy-post-grid' ),
                            'isotopestyle06' => __( 'Isotope Style 06', 'fancy-post-grid' ),
                            'isotopestyle07' => __( 'Isotope Style 07', 'fancy-post-grid' ),
                        ),
                        'default' => 'isotopestyle01',
                    ]
                );
            }
            // Add control for List Layout selection 
            // Check if the control is excluded before adding it
            if (!in_array('fancy_post_list_layout', $this->exclude_controls)) {
                $this->add_control(
                    'fancy_post_list_layout',
                    [                    
                        'label'   => __( 'List Style', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'options' => array(
                            'liststyle01' => __( 'List Style 01', 'fancy-post-grid' ),
                            'liststyle02' => __( 'List Style 02', 'fancy-post-grid' ),
                            'liststyle03' => __( 'List Style 03', 'fancy-post-grid' ),
                            'liststyle04' => __( 'List Style 04', 'fancy-post-grid' ),
                            'liststyle05' => __( 'List Style 05', 'fancy-post-grid' ),
                            'liststyle06' => __( 'List Style 06', 'fancy-post-grid' ),
                            'liststyle07' => __( 'List Style 07', 'fancy-post-grid' ),
                            
                        ),
                        'default' => 'liststyle01',
                    ]
                );
            }

            // Add control for number of Desktops Above 1200px
            if (!in_array('col_desktop', $this->exclude_controls)) {
                $this->add_control(
                    'col_desktop',
                    [
                        'label'   => esc_html__('Desktops Above 1200px', 'fancy-post-grid'),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'label_block' => true,
                        'default' => 4,
                        'options' => [
                            '1' => esc_html__('1 Column', 'fancy-post-grid'),
                            '2' => esc_html__('2 Column', 'fancy-post-grid'),
                            '3' => esc_html__('3 Column', 'fancy-post-grid'),
                            '4' => esc_html__('4 Column', 'fancy-post-grid'),
                            '5' => esc_html__('5 Column', 'fancy-post-grid'),
                            '6' => esc_html__('6 Column', 'fancy-post-grid'),
                            'auto' => esc_html__('Auto', 'fancy-post-grid'),
                        ],
                        'separator' => 'before',
                    ]
                );
            }
            if (!in_array('col_desktop_slider', $this->exclude_controls)) {
                $this->add_control(
                    'col_desktop_slider',
                    [
                        'label'   => esc_html__('Desktops Above 1200px', 'fancy-post-grid'),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'label_block' => true,
                        'default' => 4,
                        'options' => [
                            '12' => esc_html__('1 Item', 'fancy-post-grid'),
                            '6' => esc_html__('2 Items', 'fancy-post-grid'),
                            '4' => esc_html__('3 Items', 'fancy-post-grid'),
                            '3' => esc_html__('4 Items', 'fancy-post-grid'),
                            '2' => esc_html__('6 Items', 'fancy-post-grid'),
                            'auto' => esc_html__('Auto', 'fancy-post-grid'),
                        ],
                        'separator' => 'before',
                    ]
                );
            }

            $this->add_control(
                'space_between',
                [
                    'label' => esc_html__( 'Desktop Space Between', 'fancy-post-grid' ),
                    'type' => \Elementor\Controls_Manager::SLIDER,
                    'default' => [
                        'size' => 0,
                    ],
                ]
            );
            if (!in_array('col_lg', $this->exclude_controls)) {
                $this->add_control(
                    'col_lg',
                    [
                        'label'   => esc_html__('Large 1199px to 992px', 'fancy-post-grid'),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'label_block' => true,
                        'default' => 3,
                        'options' => [
                            '1' => esc_html__('1 Column', 'fancy-post-grid'),
                            '2' => esc_html__('2 Column', 'fancy-post-grid'),
                            '3' => esc_html__('3 Column', 'fancy-post-grid'),
                            '4' => esc_html__('4 Column', 'fancy-post-grid'),
                            '5' => esc_html__('5 Column', 'fancy-post-grid'),
                            '6' => esc_html__('6 Column', 'fancy-post-grid'),
                            'auto' => esc_html__('Auto', 'fancy-post-grid'),
                        ],
                        'separator' => 'before',
                    ]
                );
            }

            if (!in_array('col_lg_slider', $this->exclude_controls)) {          
                $this->add_control(
                    'col_lg_slider',
                    [
                        'label'   => esc_html__('Large 1199px to 992px', 'fancy-post-grid'),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'label_block' => true,
                        'default' => 6,
                        'options' => [
                            '12' => esc_html__('1 Item', 'fancy-post-grid'),
                            '6' => esc_html__('2 Items', 'fancy-post-grid'),
                            '4' => esc_html__('3 Items', 'fancy-post-grid'),
                            '3' => esc_html__('4 Items', 'fancy-post-grid'),
                            '2' => esc_html__('6 Items', 'fancy-post-grid'),
                            'auto' => esc_html__('Auto', 'fancy-post-grid'),
                        ],
                        'separator' => 'before',
                    ]
                );
            }
                
            $this->add_control(
                'space_between_lg',
                [
                    'label' => esc_html__( 'Large Space Between', 'fancy-post-grid' ),
                    'type' => \Elementor\Controls_Manager::SLIDER,
                    'default' => [
                        'size' => 0,
                    ],
                ]
            );
            if (!in_array('col_md', $this->exclude_controls)) {
                $this->add_control(
                    'col_md',
                    [
                        'label'   => esc_html__('Medium 991px to 768px', 'fancy-post-grid'),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'label_block' => true,
                        'default' => 3,
                        'options' => [
                            '1' => esc_html__('1 Column', 'fancy-post-grid'),
                            '2' => esc_html__('2 Column', 'fancy-post-grid'),
                            '3' => esc_html__('3 Column', 'fancy-post-grid'),
                            '4' => esc_html__('4 Column', 'fancy-post-grid'),
                            '6' => esc_html__('6 Column', 'fancy-post-grid'),
                            'auto' => esc_html__('Auto', 'fancy-post-grid'),
                        ],
                        'separator' => 'before',
                    ]
                );
            }
            if (!in_array('col_md_slider', $this->exclude_controls)) {           
                $this->add_control(
                    'col_md_slider',
                    [
                        'label'   => esc_html__('Medium 991px to 768px', 'fancy-post-grid'),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'label_block' => true,
                        'default' => 4,
                        'options' => [
                            '12' => esc_html__('1 Item', 'fancy-post-grid'),
                            '6' => esc_html__('2 Items', 'fancy-post-grid'),
                            '4' => esc_html__('3 Items', 'fancy-post-grid'),
                            '3' => esc_html__('4 Items', 'fancy-post-grid'),
                            '2' => esc_html__('6 Items', 'fancy-post-grid'),
                            'auto' => esc_html__('Auto', 'fancy-post-grid'),
                        ],
                        'separator' => 'before',
                    ]
                );
            }    
            $this->add_control(
                'space_between_md',
                [
                    'label' => esc_html__( 'Medium Space Between', 'fancy-post-grid' ),
                    'type' => \Elementor\Controls_Manager::SLIDER,
                    'default' => [
                        'size' => 0,
                    ],
                ]
            );

            if (!in_array('col_sm', $this->exclude_controls)) {
                $this->add_control(
                    'col_sm',
                    [
                        'label'   => esc_html__('Small 767px to 576px', 'fancy-post-grid'),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'label_block' => true,
                        'default' => 1,
                        'options' => [
                            '1' => esc_html__('1 Column', 'fancy-post-grid'),
                            '2' => esc_html__('2 Column', 'fancy-post-grid'),
                            '3' => esc_html__('3 Column', 'fancy-post-grid'),
                            '4' => esc_html__('4 Column', 'fancy-post-grid'),
                            '6' => esc_html__('6 Column', 'fancy-post-grid'),
                            'auto' => esc_html__('Auto', 'fancy-post-grid'),
                        ],
                        'separator' => 'before',
                    ]
                );
            }  

            if (!in_array('col_sm_slider', $this->exclude_controls)) {           
                $this->add_control(
                    'col_sm_slider',
                    [
                        'label'   => esc_html__('Small 767px to 576px', 'fancy-post-grid'),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'label_block' => true,
                        'default' => 12,
                        'options' => [
                            '12' => esc_html__('1 Item', 'fancy-post-grid'),
                            '6' => esc_html__('2 Items', 'fancy-post-grid'),
                            '4' => esc_html__('3 Items', 'fancy-post-grid'),
                            '3' => esc_html__('4 Items', 'fancy-post-grid'),
                            '2' => esc_html__('6 Items', 'fancy-post-grid'),
                            'auto' => esc_html__('Auto', 'fancy-post-grid'),
                        ],
                        'separator' => 'before',
                    ]
                );
            }
            

            $this->add_control(
                'space_between_sm',
                [
                    'label' => esc_html__( 'Small Space Between', 'fancy-post-grid' ),
                    'type' => \Elementor\Controls_Manager::SLIDER,
                    'default' => [
                        'size' => 0,
                    ],
                ]
            );

            if (!in_array('col_xs', $this->exclude_controls)) {
                $this->add_control(
                    'col_xs',
                    [
                        'label'   => esc_html__('Mobile Below 575px', 'fancy-post-grid'),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'label_block' => true,
                        'default' => 2,
                        'options' => [
                            '1' => esc_html__('1 Column', 'fancy-post-grid'),
                            '2' => esc_html__('2 Column', 'fancy-post-grid'),
                            '3' => esc_html__('3 Column', 'fancy-post-grid'),
                            '4' => esc_html__('4 Column', 'fancy-post-grid'),
                            '6' => esc_html__('6 Column', 'fancy-post-grid'),
                            'auto' => esc_html__('Auto', 'fancy-post-grid'),
                        ],
                        'separator' => 'before',
                    ]
                );
            }    

            if (!in_array('col_xs_slider', $this->exclude_controls)) {           
                $this->add_control(
                    'col_xs_slider',
                    [
                        'label'   => esc_html__('Mobile Below 575px', 'fancy-post-grid'),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'label_block' => true,
                        'default' => 12,
                        'options' => [
                            '12' => esc_html__('1 Item', 'fancy-post-grid'),
                            '6' => esc_html__('2 Items', 'fancy-post-grid'),
                            '4' => esc_html__('3 Items', 'fancy-post-grid'),
                            '3' => esc_html__('4 Items', 'fancy-post-grid'),
                            '2' => esc_html__('6 Items', 'fancy-post-grid'),
                            'auto' => esc_html__('Auto', 'fancy-post-grid'),
                        ],
                        'separator' => 'before',
                    ]
                );
            }

            $this->add_control(
                'space_between_xs',
                [
                    'label' => esc_html__( 'Mobile Space Between', 'fancy-post-grid' ),
                    'type' => \Elementor\Controls_Manager::SLIDER,
                    'default' => [
                        'size' => 0,
                    ],
                ]
            );

            // Add control for text alignment
            $this->add_control(
                'text_alignment',
                [
                    'label'   => __( 'Text Alignment', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::CHOOSE,
                    'options' => array(
                        'left'   => array(
                            'title' => __( 'Left', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-left', // Elementor's built-in icon
                        ),
                        'center' => array(
                            'title' => __( 'Center', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-center', // Elementor's built-in icon
                        ),
                        'right'  => array(
                            'title' => __( 'Right', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-right', // Elementor's built-in icon
                        ),
                    ),
                    'default' => 'center',
                ]
            );

            $this->end_controls_section();
            // Layout Section
            $this->start_controls_section(
                'query_builder_section',
                [
                    'label' => __( 'Query Builder', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
                ]
            );
            // Add Query Builder options
            $this->add_control(
                'category_filter',
                [
                    'label'   => __( 'Select Category', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT2,
                    'options' => $this->get_categories_list(),
                    'label_block' => true,
                    'multiple' => true,
                ]
            );

            $this->add_control(
                'tag_filter',
                [
                    'label'   => __( 'Select Tags', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT2,
                    'options' => $this->get_tags_list(),
                    'label_block' => true,
                    'multiple' => true,
                ]
            );

            $this->add_control(
                'author_filter',
                [
                    'label'   => __( 'Select Author', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT2,
                    'options' => $this->get_authors_list(),
                    'label_block' => true,
                ]
            );

            // Sorting options
            $this->add_control(
                'sort_order',
                [                    
                    'label'   => __( 'Sort Order', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'desc' => __( 'Descending', 'fancy-post-grid' ),
                        'asc'  => __( 'Ascending', 'fancy-post-grid' ),
                    ),
                    'default' => 'desc',
                ]
            );

            // Number of posts per page
            $this->add_control(
                'posts_per_page',
                [                    
                    'label'       => __( 'Posts per Page', 'fancy-post-grid' ),
                    'type'        => \Elementor\Controls_Manager::NUMBER,
                    'default'     => 6,
                    'min'         => 1,
                    'step'        => 1,
                ]
            );

            // Include/Exclude posts
            $this->add_control(
                'include_posts',
                [
                    'label'   => __( 'Include Posts (IDs)', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::TEXT,
                    'description' => __( 'Enter post IDs separated by commas', 'fancy-post-grid' ),
                ]
            );

            $this->add_control(
                'exclude_posts',
                [
                    'label'   => __( 'Exclude Posts (IDs)', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::TEXT,
                    'description' => __( 'Enter post IDs separated by commas', 'fancy-post-grid' ),
                ]
            );

            $this->end_controls_section();
            // Pagination Section
            $this->start_controls_section(
                'pagination_section',
                [
                    'label' => __( 'Pagination', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
                ]
            );
            // Check if the control is excluded before adding it
            if (!in_array('show_pagination', $this->exclude_controls)) {
                $this->add_control(
                    'show_pagination',
                    [
                        'label'       => __( 'Show Pagination', 'fancy-post-grid' ),
                        'type'        => \Elementor\Controls_Manager::SWITCHER,
                        'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                        'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                        'return_value' => 'yes',
                        'default' => 'yes',
                        'render_type' => 'template'
                    ]
                );
            }
            // Check if the control is excluded before adding it
            if (!in_array('slider_pagination_type', $this->exclude_controls)) {
                $this->add_control(
                    'slider_pagination_type',
                    [
                        'label'   => __( 'Pagination Type', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'options' => [
                            'bullets'  => __( 'Bullets', 'fancy-post-grid' ),
                            'fraction' => __( 'Fraction', 'fancy-post-grid' ),
                            'progressbar' => __( 'Progress', 'fancy-post-grid' ),
                        ],
                        'default' => 'bullets',
                        
                        'render_type' => 'template',
                    ]
                );
            }
            $this->end_controls_section();

            // Slider Section
            // Check if the control is excluded before adding it
            if (!in_array('slider_section', $this->exclude_controls)) {
                $this->start_controls_section(
                    'slider_section',
                    [
                        'label' => __( 'Slider', 'fancy-post-grid' ),
                        'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
                    ]
                );

                // Enable Arrow Control
                $this->add_control(
                    'show_arrow_control',
                    [
                        'label'       => __( 'Enable Arrow Control', 'fancy-post-grid' ),
                        'type'        => \Elementor\Controls_Manager::SWITCHER,
                        'label_on'    => esc_html__( 'True', 'fancy-post-grid' ),
                        'label_off'   => esc_html__( 'False', 'fancy-post-grid' ),
                        'return_value' => 'yes',
                        'default'     => 'yes',
                        'render_type' => 'template',
                    ]
                );

                // Enable Pagination Control
                $this->add_control(
                    'show_pagination_control',
                    [
                        'label'       => __( 'Enable Pagination Control', 'fancy-post-grid' ),
                        'type'        => \Elementor\Controls_Manager::SWITCHER,
                        'label_on'    => esc_html__( 'True', 'fancy-post-grid' ),
                        'label_off'   => esc_html__( 'False', 'fancy-post-grid' ),
                        'return_value' => 'yes',
                        'default'     => 'yes',
                        'render_type' => 'template',
                    ]
                );

                // Enable Keyboard Control
                $this->add_control(
                    'enable_keyboard_control',
                    [
                        'label'       => __( 'Enable Keyboard Control', 'fancy-post-grid' ),
                        'type'        => \Elementor\Controls_Manager::SWITCHER,
                        'label_on'    => esc_html__( 'True', 'fancy-post-grid' ),
                        'label_off'   => esc_html__( 'False', 'fancy-post-grid' ),
                        'return_value' => 'yes',
                        'default'     => 'no',
                        'render_type' => 'template',
                    ]
                );

                // Enable Looping
                $this->add_control(
                    'enable_looping',
                    [
                        'label'       => __( 'Enable Looping', 'fancy-post-grid' ),
                        'type'        => \Elementor\Controls_Manager::SWITCHER,
                        'label_on'    => esc_html__( 'True', 'fancy-post-grid' ),
                        'label_off'   => esc_html__( 'False', 'fancy-post-grid' ),
                        'return_value' => 'yes',
                        'default'     => 'yes',
                        'render_type' => 'template',
                    ]
                );

                // Enable Free Mode
                $this->add_control(
                    'enable_free_mode',
                    [
                        'label'       => __( 'Enable Free Mode', 'fancy-post-grid' ),
                        'type'        => \Elementor\Controls_Manager::SWITCHER,
                        'label_on'    => esc_html__( 'True', 'fancy-post-grid' ),
                        'label_off'   => esc_html__( 'False', 'fancy-post-grid' ),
                        'return_value' => 'yes',
                        'default'     => 'no',
                        'render_type' => 'template',
                    ]
                );

                // Pagination Clickable Mode
                $this->add_control(
                    'pagination_clickable_mode',
                    [
                        'label'       => __( 'Pagination Clickable Mode', 'fancy-post-grid' ),
                        'type'        => \Elementor\Controls_Manager::SWITCHER,
                        'label_on'    => esc_html__( 'True', 'fancy-post-grid' ),
                        'label_off'   => esc_html__( 'False', 'fancy-post-grid' ),
                        'return_value' => 'yes',
                        'default'     => 'yes',
                        'render_type' => 'template',
                    ]
                );

                // Auto Play Speed
                $this->add_control(
                    'auto_play_speed',
                    [
                        'label'       => __( 'Auto Play Speed (ms)', 'fancy-post-grid' ),
                        'type'        => \Elementor\Controls_Manager::NUMBER,
                        'min'         => 100,
                        'step'        => 100,
                        'default'     => 3000,
                        'description' => __( 'Speed in milliseconds', 'fancy-post-grid' ),
                    ]
                );

                // Slider Item Gap
                $this->add_control(
                    'slider_item_gap',
                    [
                        'label'       => __( 'Slider Item Gap', 'fancy-post-grid' ),
                        'type'        => \Elementor\Controls_Manager::NUMBER,
                        'min'         => 0,
                        'step'        => 1,
                        'default'     => 10,
                        'description' => __( 'Gap between items in pixels', 'fancy-post-grid' ),
                        'selectors'   => [
                            '{{WRAPPER}} .fancy-post-item' => 'gap: {{VALUE}}px;', // Dynamically adds gap
                        ],
                    ]
                );

                $this->end_controls_section();
            }

            // Links Section
            $this->start_controls_section(
                'link_section',
                [
                    'label' => __( 'Links', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
                ]
            );
            $this->add_control(
                'link_type',
                [
                    'label'   => __( 'Post link type', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'link_details' => __( 'Link to details page', 'fancy-post-grid' ),
                        'no_link'  => __( 'No Link', 'fancy-post-grid' ),
                    ),
                    'default' => 'link_details',
                ]
            );
            $this->add_control(
                'link_target',
                [                    'label'   => __( 'Link Target', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'same_window' => __( 'Same Window', 'fancy-post-grid' ),
                        'new_window'  => __( 'New Window', 'fancy-post-grid' ),
                    ),
                    'default' => 'same_window',
                ]
            );
            $this->add_control(
                'thumbnail_link',
                array(
                    'label'       => __( 'Thumbnail Link', 'fancy-post-grid' ),
                    'type'        => \Elementor\Controls_Manager::SWITCHER,
                    'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                    'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                    'return_value' => 'yes',
                    'default' => 'yes',
                    'render_type' => 'template'
                )
            );
            $this->end_controls_section();
            // Style Section
            $this->start_controls_section(
                'style_settings',
                [
                    'label' => __( ' Field Selection', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_SETTINGS,
                ]
            );
            // Show/Hide controls for Post Elements
            $this->add_control(
                'show_post_title',
                [
                    'label'   => __( 'Show Post Title', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                    'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                    'return_value' => 'yes',
                    'default' => 'yes',
                    'render_type' => 'template'
                ]
            );

            $this->add_control(
                'show_post_thumbnail',
                [                    
                    'label'   => __( 'Show Thumbnail', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                    'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                    'return_value' => 'yes',
                    'default' => 'yes',
                    'render_type' => 'template'
                ]
            );

            
            $this->add_control(
                'show_post_excerpt',
                [                    
                    'label'       => __( 'Show Post Excerpt', 'fancy-post-grid' ),
                    'type'        => \Elementor\Controls_Manager::SWITCHER,
                    'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                    'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                    'return_value' => 'yes',
                    'default' => 'yes',
                    'render_type' => 'template'
                ]
            );

            $this->add_control(
                'show_post_readmore',
                [
                    'label'       => __( 'Show Read More Button', 'fancy-post-grid' ),
                    'type'        => \Elementor\Controls_Manager::SWITCHER,
                    'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                    'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                    'return_value' => 'yes',
                    'default' => 'yes',
                    'render_type' => 'template'
                ]
            );
            $this->add_control(
                'show_meta_data',
                [
                    'label'   => __( 'Meta Data', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                    'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                    'return_value' => 'yes',
                    'default' => 'yes',
                    'render_type' => 'template'
                ]
            );

            $this->add_control(
                'show_post_date',
                [
                    'label'   => __( '- Show Post Date', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                    'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                    'return_value' => 'yes',
                    'default' => 'yes',
                    'render_type' => 'template'
                ]
            );

            $this->add_control(
                'show_post_author',
                [
                    'label'   => __( '- Show Post Author', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                    'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                    'return_value' => 'yes',
                    'default' => 'yes',
                    'render_type' => 'template'
                ]
            );

            $this->add_control(
                'show_post_categories',
                [
                    'label'   => __( '- Show Post Categories', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                    'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                    'return_value' => 'yes',
                    'default' => 'yes',
                    'render_type' => 'template'
                ]
            );

            $this->add_control(
                'show_post_tags',
                [
                    'label'   => __( '- Show Post Tags', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                    'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                    'return_value' => 'yes',
                    'default' => 'yes',
                    'render_type' => 'template'
                ]
            );

            $this->add_control(
                'show_comments_count',
                [
                    'label'   => __( '- Show Comments Count', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                    'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                    'return_value' => 'yes',
                    'default' => 'yes',
                    'render_type' => 'template'
                ]
            );
            $this->add_control(
                'show_meta_data_icon',
                [
                    'label'   => __( 'Meta Icon', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                    'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                    'return_value' => 'yes',
                    'default' => 'yes',
                    'render_type' => 'template'
                ]
            );

            $this->add_control(
                'show_post_date_icon',
                [
                    'label'   => __( '- Show Post Date  Icon ', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                    'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                    'return_value' => 'yes',
                    'default' => 'yes',
                    'render_type' => 'template'
                ]
            );

            $this->add_control(
                'show_post_author_icon',
                [
                    'label'   => __( '- Show Post Author  Icon', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                    'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                    'return_value' => 'yes',
                    'default' => 'yes',
                    'render_type' => 'template'
                ]
            );

            $this->add_control(
                'show_post_categories_icon',
                [
                    'label'   => __( '- Show Post Categories Icon', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                    'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                    'return_value' => 'yes',
                    'default' => 'yes',
                    'render_type' => 'template'
                ]
            );

            $this->add_control(
                'show_post_tags_icon',
                [
                    'label'   => __( '- Show Post Tags Icon', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                    'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                    'return_value' => 'yes',
                    'default' => 'yes',
                    'render_type' => 'template'
                ]
            );

            $this->add_control(
                'show_comments_count_icon',
                [
                    'label'   => __( '- Show Comments Count Icon', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                    'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                    'return_value' => 'yes',
                    'default' => 'yes',
                    'render_type' => 'template'
                ]
            );

            $this->add_control(
                'show_post_social_share',
                [
                    'label'       => __( 'Show Social Share', 'fancy-post-grid' ),
                    'type'        => \Elementor\Controls_Manager::SWITCHER,
                    'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                    'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                    'return_value' => 'yes',
                    'default' => 'yes',
                    'render_type' => 'template'
                ]
            );
            $this->end_controls_section();
            // Post Title
            $this->start_controls_section(
                'post_title',
                [
                    'label' => __( ' Post Title', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_SETTINGS,
                ]
            );
            $this->add_control(
                'title_tag',
                [
                    'label'   => __( 'Title Tag', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'h1' => __( 'H1', 'fancy-post-grid' ),
                        'h2'  => __( 'H2', 'fancy-post-grid' ),
                        'h3' => __( 'H3', 'fancy-post-grid' ),
                        'h4'  => __( 'H4', 'fancy-post-grid' ),
                        'h5' => __( 'H5', 'fancy-post-grid' ),
                        'h6'  => __( 'H6', 'fancy-post-grid' ),
                    ),
                    'default' => 'h3',
                    'render_type' => 'template'
                ]
            );
            // Show/Hide Title Hover Underline
            $this->add_control(
                'title_hover_underline',
                [
                    'label'   => __( 'Title Hover Underline', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'enable' => __( 'Enable', 'fancy-post-grid' ),
                        'disable'  => __( 'Disable', 'fancy-post-grid' ),
                    ),
                    'default' => 'enable',
                    'render_type' => 'template'
                ]
            );
            // Title Visibility Style
            $this->add_control(
                'title_visibility_style',
                [
                    'label'   => __( 'Title Visibility Style', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'default' => __( 'Default', 'fancy-post-grid' ),
                        'show_1_line' => __( 'Show in 1 Line', 'fancy-post-grid' ),
                        'show_2_lines' => __( 'Show in 2 Lines', 'fancy-post-grid' ),
                        'show_3_lines' => __( 'Show in 3 Lines', 'fancy-post-grid' ),
                    ),
                    'default' => 'default',
                    'render_type' => 'template'
                ]
            );

            // Title Crop By
            $this->add_control(
                'title_crop_by',
                [
                    'label'   => __( 'Title Crop By', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'character' => __( 'Character', 'fancy-post-grid' ),
                        'word' => __( 'Word', 'fancy-post-grid' ),
                    ),
                    'default' => 'character',
                    'render_type' => 'template'
                ]
            );

            // Title Length
            $this->add_control(
                'title_length',
                [
                    'label'   => __( 'Title Length', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::NUMBER,
                    'default' => 50,
                    'min'     => 1,
                ]
            );

            $this->end_controls_section();
            // Thumbnail Section
            $this->start_controls_section(
                'thumbnail',
                [
                    'label' => __( ' Thumbnail', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_SETTINGS,
                ]
            );
            // Thumbnail Styling
            $this->add_control(
                'thumbnail_size',
                [
                    'label'   => __( 'Thumbnail Size', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'thumbnail'  => __( 'Thumbnail', 'fancy-post-grid' ),
                        'medium'     => __( 'Medium', 'fancy-post-grid' ),
                        'large'      => __( 'Large', 'fancy-post-grid' ),
                        'full'       => __( 'Full', 'fancy-post-grid' ),
                        'fancy_post_custom_size'=> __( 'Custom Size (768x500)', 'fancy-post-grid' ),
                        'fancy_post_square'     => __( 'Square(500x500)', 'fancy-post-grid' ),
                        'fancy_post_landscape'  => __( 'Landscape(834x550)', 'fancy-post-grid' ),
                        'fancy_post_portrait'   => __( 'Portrait(421x550)', 'fancy-post-grid' ),
                        'fancy_post_list'       => __( 'List Size(1200 x 650)', 'fancy-post-grid' ),
                    ),
                    'default' => 'full',
                    'render_type' => 'template'
                ]
            );

            $this->end_controls_section();

            // Excerpt / Content Section
            $this->start_controls_section(
                'excerpt_content',
                [
                    'label' => __( ' Excerpt / Content', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_SETTINGS,
                ]
            );
            // Excerpt Type
            $this->add_control(
                'excerpt_type',
                [
                    'label'   => __( 'Excerpt Type', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'character' => __( 'Character', 'fancy-post-grid' ),
                        'word' => __( 'Word', 'fancy-post-grid' ),
                        'full_content' => __( 'Full Content', 'fancy-post-grid' ),
                    ),
                    'default' => 'character',
                    'render_type' => 'template'
                ]
            );
            // Excerpt Limit
            $this->add_control(
                'excerpt_length',
                [
                    'label'   => __( 'Excerpt Limit', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::NUMBER,
                    'default' => 200,
                    'min'     => 1,
                ]
            );
            // Excerpt Limit
            $this->add_control(
                'expansion_indicator',
                [
                    'label'   => __( 'Expansion Indicator', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::TEXT,
                    'default' => '...',    
                ]
            );

            $this->end_controls_section();

            // Meta Data Section
            $this->start_controls_section(
                'meta_data_content',
                [
                    'label' => __( 'Meta Data', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_SETTINGS,
                ]
            );

            // Meta Separator
            $this->add_control(
                'meta_separator',
                [
                    'label'   => __( 'Meta Separator', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        '-'         => __( 'Hyphen (-)', 'fancy-post-grid' ),
                        '.'            => __( 'Dot (.)', 'fancy-post-grid' ),
                        ''           => __( 'None', 'fancy-post-grid' ),
                        '/'   => __( 'Single Slash (/)', 'fancy-post-grid' ),
                        '//'   => __( 'Double Slash (//)', 'fancy-post-grid' ),
                        '|'  => __( 'Vertical Pipe (|)', 'fancy-post-grid' ),
                    ),
                    'default' => '-',
                ]
            );

            // Author Prefix
            $this->add_control(
                'author_prefix',
                [
                    'label'       => __( 'Author Prefix', 'fancy-post-grid' ),
                    'type'        => \Elementor\Controls_Manager::TEXT,
                    'default'     => __( 'By', 'fancy-post-grid' ),
                    'placeholder' => __( 'Enter prefix text', 'fancy-post-grid' ),
                ]
            );

            // Author Icon Visibility
            $this->add_control(
                'author_icon_visibility',
                [
                    'label'        => __( 'Show Author Icon', 'fancy-post-grid' ),
                    'type'         => \Elementor\Controls_Manager::SWITCHER,
                    'label_on'     => __( 'Show', 'fancy-post-grid' ),
                    'label_off'    => __( 'Hide', 'fancy-post-grid' ),
                    'return_value' => 'yes',
                    'default'      => '',
                ]
            );

            // Author Image/Icon Selection
            $this->add_control(
                'author_image_icon',
                [
                    'label'   => __( 'Author Image/Icon', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'image' => __( 'Image', 'fancy-post-grid' ),
                        'icon'  => __( 'Icon', 'fancy-post-grid' ),
                    ),
                    'default' => 'icon',
                    'condition' => array(
                        'author_icon_visibility' => 'yes',
                    ),
                ]
            );


            $this->end_controls_section();

            // Read More Section
            $this->start_controls_section(
                'read_more_content',
                [
                    'label' => __( 'Read More', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_SETTINGS,
                ]
            );
            
            // Button Type
            $this->add_control(
                'button_type',
                [
                    'label'   => __( 'Button Style', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'filled' => __( 'Filled', 'fancy-post-grid' ),
                        'border' => __( 'Border', 'fancy-post-grid' ),
                        'flat' => __( 'Flat', 'fancy-post-grid' ),
                    ),
                    'default' => 'filled',
                ]
            );
            // Read More Label
            $this->add_control(
                'read_more_label',
                [
                    'label'   => __( 'Read More Label', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::TEXT,
                    'default' => 'Read More',    
                ]
            );   

            // Show Button Icon
            $this->add_control(
                'button_icon',
                [
                    'label'   => __( 'Show Button Icon', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                    'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                    'return_value' => 'yes',
                    'default' => 'yes',
                    'render_type' => 'template'
                ]
            );

            // Icon Library
            $this->add_control(
                'choose_icon',
                [
                    'label'     => __( 'Icon Library ', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::ICONS,
                    'default'   => array(
                        'value'   => 'fas fa-star',
                        'library' => 'fa-solid',
                    ),
                    'condition' => array(
                        'button_icon' => 'yes',
                    ),
                    'render_type' => 'template'
                ]
            );
               
            // Icon Position
            $this->add_control(
                'button_position',
                [
                    'label'   => __( 'Icon Position', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'button_position_right' => __( 'Right', 'fancy-post-grid' ),
                        'button_position_left'  => __( 'Left', 'fancy-post-grid' ),
                    ),
                    'default' => 'button_position_right',
                    'condition' => array(
                        'button_icon' => 'yes',
                    ),
                    'render_type' => 'template'
                ]
            );

            $this->end_controls_section();

            // Style Section
            $this->start_controls_section(
                'post_title_style',
                [
                    'label' => __( 'Post Title', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
                ]
            );

            // Title Styling: margin
            $this->add_control(
                'title_margin',
                [
                    'label'      => __( 'Title Margin', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', 'em', '%' ),
                    'selectors'  => array(
                        '{{WRAPPER}} .fancy-post-title' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                    'render_type' => 'template'
                ]
            );            

            // Title Styling: Padding
            $this->add_control(
                'title_padding',
                [
                    'label'      => __( 'Title Padding', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', 'em', '%' ),
                    'selectors'  => array(
                        '{{WRAPPER}} .fancy-post-title' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                    'render_type' => 'template'
                ]
            );
            // Title Styling: Typography
            $this->add_group_control(
                \Elementor\Group_Control_Typography::get_type(),
                [
                    'name'     => 'title_typography',
                    'label'    => __( 'Typography', 'fancy-post-grid' ),
                    'selector' => '{{WRAPPER}} .fancy-post-title',
                ]
            );

            // Title Styling: Minimum Height
            $this->add_control(
                'title_min_height',
                [
                    'label'     => __( 'Minimum Height', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::NUMBER,
                    'default'   => '',
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-title' => 'min-height: {{VALUE}}px;',
                    ),
                    'render_type' => 'template'
                ]
            );

            // Title Styling: Alignment
            $this->add_control(
                'title_alignment',
                [
                    'label'     => __( 'Alignment', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::CHOOSE,
                    'options'   => array(
                        'left'   => array(
                            'title' => __( 'Left', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-left',
                        ),
                        'center' => array(
                            'title' => __( 'Center', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-center',
                        ),
                        'right'  => array(
                            'title' => __( 'Right', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-right',
                        ),
                        'justify' => array(
                            'title' => __( 'Justify', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-justify',
                        ),
                    ),
                    'default'   => 'left',
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-title' => 'text-align: {{VALUE}};',
                    ),
                    'render_type' => 'template'
                ]
            );

            // Title Styling: Tabs (Normal, Hover, Box Hover)
            $this->start_controls_tabs('title_style_tabs');

            // Normal Tab
            $this->start_controls_tab(
                'title_normal',
                [
                    'label' => __( 'Normal', 'fancy-post-grid' ),
                ]
            );

            $this->add_control(
                'title_normal_color',
                [
                    'label'     => __( 'Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-title' => 'color: {{VALUE}};',
                    ),
                    'render_type' => 'template'
                ]
            );

            $this->add_control(
                'title_normal_background',
                [
                    'label'     => __( 'Background Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-title' => 'background-color: {{VALUE}};',
                    ),
                    'render_type' => 'template'
                ]
            );

            $this->end_controls_tab();

            // Hover Tab
            $this->start_controls_tab(
                'title_hover',
                [
                    'label' => __( 'Hover', 'fancy-post-grid' ),
                ]
            );

            $this->add_control(
                'title_hover_color',
                [
                    'label'     => __( 'Hover Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-title:hover' => 'color: {{VALUE}};',
                    ),
                    'render_type' => 'template'
                ]
            );

            $this->add_control(
                'title_hover_background',
                [
                    'label'     => __( 'Hover Background Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-title:hover' => 'background-color: {{VALUE}};',
                    ),
                    'render_type' => 'template'
                ]
            );

            $this->end_controls_tab();

            // Box Hover Tab
            $this->start_controls_tab(
                'title_box_hover',
                [
                    'label' => __( 'Box Hover', 'fancy-post-grid' ),
                ]
            );

            $this->add_control(
                'title_box_hover_color',
                [
                    'label'     => __( 'Box Hover Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-title:hover' => 'color: {{VALUE}};',
                    ),
                    'render_type' => 'template'
                ]
            );

            $this->add_control(
                'title_box_hover_background',
                [
                    'label'     => __( 'Box Hover Background Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-title:hover' => 'background-color: {{VALUE}};',
                    ),
                    'render_type' => 'template'
                ]
            );

            $this->end_controls_tab();

            $this->end_controls_tabs(); // End Title Tabs

            $this->end_controls_section(); // End Post Title Style Section

            // Thumbnail Style Section
            $this->start_controls_section(
                'thumbnail_style',
                [
                    'label' => __( 'Thumbnail', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
                ]
            );

            // Thumbnail Styling: Margin
            $this->add_control(
                'thumbnail_margin',
                [
                    'label'      => __( 'Thumbnail Margin', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', 'em', '%' ),
                    'selectors'  => array(
                        '{{WRAPPER}} .fancy-post-thumbnail' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                    'render_type' => 'template'
                ]
            );

            // Thumbnail Styling: Border Radius
            $this->add_control(
                'thumbnail_border_radius',
                [
                    'label'      => __( 'Border Radius', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', 'em', '%' ),
                    'selectors'  => array(
                        '{{WRAPPER}} .fancy-post-thumbnail img' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),

                    'render_type' => 'template'
                ]
            );

            // Thumbnail Styling: Image Width
            $this->add_control(
                'thumbnail_width',
                [
                    'label'   => __( 'Image Width', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'default' => 'default',
                    'options' => array(
                        'default' => __( 'Default', 'fancy-post-grid' ),
                        '100%'    => __( '100%', 'fancy-post-grid' ),
                        'auto'    => __( 'Auto', 'fancy-post-grid' ),
                    ),
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-thumbnail img' => 'width: {{VALUE}};',
                    ),
                    'render_type' => 'template'
                ]
            );

            // Overlay Style Tabs
            $this->start_controls_tabs('thumbnail_overlay_style_tabs');

            // Normal Overlay Tab
            $this->start_controls_tab(
                'thumbnail_overlay_normal',
                [
                    'label' => __( 'Normal', 'fancy-post-grid' ),
                ]
            );

            $this->add_control(
                'thumbnail_overlay_background',
                [
                    'label'     => __( 'Overlay Background', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-thumbnail .overlay' => 'background-color: {{VALUE}};',
                    ),
                    'render_type' => 'template'

                ]
            );

            $this->add_control(
                'thumbnail_overlay_opacity',
                [
                    'label'      => __( 'Opacity', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::SLIDER,
                    'range'      => array(
                        'px' => array(
                            'min' => 0,
                            'max' => 1,
                            'step' => 0.1,
                        ),
                    ),
                    'selectors'  => array(
                        '{{WRAPPER}} .fancy-post-thumbnail .overlay' => 'opacity: {{SIZE}};',
                    ),
                    'render_type' => 'template'
                ]
            );

            $this->end_controls_tab();

            // Hover Overlay Tab
            $this->start_controls_tab(
                'thumbnail_overlay_hover',
                [
                    'label' => __( 'Hover', 'fancy-post-grid' ),
                ]
            );

            $this->add_control(
                'thumbnail_hover_background',
                [
                    'label'     => __( 'Overlay Background', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-thumbnail:hover .overlay' => 'background-color: {{VALUE}};',
                    ),
                    'render_type' => 'template'
                ]
            );

            $this->add_control(
                'thumbnail_hover_opacity',
                [
                    'label'      => __( 'Opacity', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::SLIDER,
                    'range'      => array(
                        'px' => array(
                            'min' => 0,
                            'max' => 1,
                            'step' => 0.1,
                        ),
                    ),
                    'selectors'  => array(
                        '{{WRAPPER}} .fancy-post-thumbnail:hover .overlay' => 'opacity: {{SIZE}};',
                    ),
                    'render_type' => 'template'
                ]
            );

            $this->add_control(
                'thumbnail_hover_transition',
                [
                    'label'      => __( 'Transition Duration', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::SLIDER,
                    'range'      => array(
                        'px' => array(
                            'min' => 0,
                            'max' => 3,
                            'step' => 0.1,
                        ),
                    ),
                    'default'    => array(
                        'size' => 0.3, // Default transition duration
                    ),
                    'selectors'  => array(
                        '{{WRAPPER}} .fancy-post-thumbnail .overlay' => 'transition-duration: {{SIZE}}s;',
                    ),
                    'render_type' => 'template'
                ]
            );


            $this->end_controls_tab();
            $this->end_controls_tabs();

            $this->end_controls_section();

            // Excerpt/Content Style
            $this->start_controls_section(
                'excerpt_content_style',
                [
                    'label' => __( 'Excerpt/Content', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
                ]
            );

            // Typography Control
            $this->add_group_control(
                \Elementor\Group_Control_Typography::get_type(),
                [
                    'name'     => 'excerpt_typography',
                    'label'    => __( 'Typography', 'fancy-post-grid' ),
                    'selector' => '{{WRAPPER}} .fancy-post-excerpt',
                ]
            );

            // Excerpt Spacing Control
            $this->add_control(
                'excerpt_spacing',
                [
                    'label'      => __( 'Excerpt Spacing', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', 'em', '%' ),
                    'selectors'  => array(
                        '{{WRAPPER}} .fancy-post-excerpt' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                     'render_type' => 'template'
                ]
            );

            // Excerpt Alignment Control
            
            $this->add_control(
                'excerpt_alignment',
                [
                    'label'     => __( 'Alignment', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::CHOOSE,
                    'options'   => array(
                        'left'   => array(
                            'title' => __( 'Left', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-left',
                        ),
                        'center' => array(
                            'title' => __( 'Center', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-center',
                        ),
                        'right'  => array(
                            'title' => __( 'Right', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-right',
                        ),
                        'justify' => array(
                            'title' => __( 'Justify', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-justify',
                        ),
                    ),
                    'default'   => 'left',
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-excerpt' => 'text-align: {{VALUE}};',
                    ),
                     'render_type' => 'template'
                ]
            );

            // Tabs for Normal and Box Hover
            $this->start_controls_tabs('excerpt_color_tabs');

            // Normal Tab
            $this->start_controls_tab(
                'excerpt_normal_tab',
                [
                    'label' => __( 'Normal', 'fancy-post-grid' ),
                ]
            );

            // Excerpt Color Control (Normal)
            $this->add_control(
                'excerpt_normal_color',
                [
                    'label'     => __( 'Excerpt Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-excerpt' => 'color: {{VALUE}};',
                    ),
                     'render_type' => 'template'
                ]
            );

            $this->end_controls_tab();

            // Box Hover Tab
            $this->start_controls_tab(
                'excerpt_hover_tab',
                [
                    'label' => __( 'Box Hover', 'fancy-post-grid' ),
                ]
            );

            // Excerpt Color on Hover Control
            $this->add_control(
                'excerpt_hover_color',
                [
                    'label'     => __( 'Excerpt Color on Hover', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post:hover .fancy-post-excerpt' => 'color: {{VALUE}};',
                    ),
                     'render_type' => 'template'
                ]
            );

            $this->end_controls_tab();
            $this->end_controls_tabs();

            $this->end_controls_section();

            // Meta Data Style
            $this->start_controls_section(
                'meta_data_style',
                [
                    'label' => __( 'Meta Data', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
                ]
            );

            // Meta Data Typography
            $this->add_group_control(
                \Elementor\Group_Control_Typography::get_type(),
                [
                    'name'     => 'meta_typography',
                    'label'    => __( 'Typography', 'fancy-post-grid' ),
                    'selector' => '{{WRAPPER}} .fancy-post-meta',
                ]
            );

            // Meta Data Alignment
            $this->add_responsive_control(
                'meta_alignment',
                [
                    'label'     => __( 'Alignment', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::CHOOSE,
                    'options'   => array(
                        'left'   => array(
                            'title' => __( 'Left', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-left',
                        ),
                        'center' => array(
                            'title' => __( 'Center', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-center',
                        ),
                        'right'  => array(
                            'title' => __( 'Right', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-right',
                        ),
                    ),
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-meta' => 'text-align: {{VALUE}};',
                    ),
                     'render_type' => 'template'
                ]
            );

            // Meta Data Margin
            $this->add_control(
                'meta_margin',
                [
                    'label'      => __( 'Margin', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', 'em', '%' ),
                    'selectors'  => array(
                        '{{WRAPPER}} .fancy-post-meta' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                     'render_type' => 'template'
                ]
            );

            // Meta Color Tabs
            $this->start_controls_tabs('meta_color_tabs');

            // Normal Tab
            $this->start_controls_tab(
                'meta_normal_tab',
                [
                    'label' => __( 'Normal', 'fancy-post-grid' ),
                ]
            );

            $this->add_control(
                'meta_color',
                [
                    'label'     => __( 'Meta Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-meta' => 'color: {{VALUE}};',
                    ),
                     'render_type' => 'template'
                ]
            );

            $this->add_control(
                'meta_link_color',
                [
                    'label'     => __( 'Meta Link Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-meta a' => 'color: {{VALUE}};',
                    ),
                     'render_type' => 'template'
                ]
            );

            $this->add_control(
                'meta_icon_color',
                [
                    'label'     => __( 'Icon Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-meta i' => 'color: {{VALUE}};',
                    ),
                     'render_type' => 'template'
                ]
            );

            $this->end_controls_tab();

            // Hover Tab
            $this->start_controls_tab(
                'meta_hover_tab',
                [
                    'label' => __( 'Hover', 'fancy-post-grid' ),
                ]
            );

            $this->add_control(
                'meta_link_hover_color',
                [
                    'label'     => __( 'Link Hover Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-meta a:hover' => 'color: {{VALUE}};',
                    ),
                     'render_type' => 'template'
                ]
            );

            $this->end_controls_tab();

            // Box Hover Tab
            $this->start_controls_tab(
                'meta_box_hover_tab',
                [
                    'label' => __( 'Box Hover', 'fancy-post-grid' ),
                ]
            );

            $this->add_control(
                'meta_box_hover_color',
                [
                    'label'     => __( 'Meta Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}}:hover .fancy-post-meta' => 'color: {{VALUE}};',
                    ),
                     'render_type' => 'template'
                ]
            );

            $this->end_controls_tab();

            $this->end_controls_tabs();

            $this->end_controls_section();


            // Read More Style
            $this->start_controls_section(
                'read_more_style',
                [
                    'label' => __( 'Read More', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
                ]
            );

            // Typography
            $this->add_group_control(
                \Elementor\Group_Control_Typography::get_type(),
                [
                    'name'     => 'readmore_typography',
                    'label'    => __( 'Typography', 'fancy-post-grid' ),
                    'selector' => '{{WRAPPER}} .readmore-button',
                ]
            );

            // Button Space
            $this->add_control(
                'readmore_button_margin',
                [
                    'label'     => __( 'Button Space', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', 'em', '%' ),
                    'selectors' => array(
                        '{{WRAPPER}} .readmore-button' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                     'render_type' => 'template'
                ]
            );

            // Button Padding
            $this->add_control(
                'readmore_button_padding',
                [
                    'label'     => __( 'Button Padding', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', 'em', '%' ),
                    'selectors' => array(
                        '{{WRAPPER}} .readmore-button' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                     'render_type' => 'template'
                ]
            );

            // Button Alignment
            $this->add_responsive_control(
                'readmore_button_alignment',
                [
                    'label'        => __( 'Alignment', 'fancy-post-grid' ),
                    'type'         => \Elementor\Controls_Manager::CHOOSE,
                    'options'      => array(
                        'left'   => array(
                            'title' => __( 'Left', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-left',
                        ),
                        'center' => array(
                            'title' => __( 'Center', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-center',
                        ),
                        'right'  => array(
                            'title' => __( 'Right', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-right',
                        ),
                    ),
                    'selectors'    => array(
                        '{{WRAPPER}} .fancy-post-readmore' => 'text-align: {{VALUE}};',
                    ),
                     'render_type' => 'template'
                ]
            );

            // Start Tabs for Normal, Hover, and Box Hover
            $this->start_controls_tabs('readmore_style_tabs');

            // Normal Tab
            $this->start_controls_tab(
                'readmore_normal_tab',
                [
                    'label' => __( 'Normal', 'fancy-post-grid' ),
                ]
            );

            $this->add_control(
                'readmore_normal_text_color',
                [
                    'label'     => __( 'Text Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .readmore-button' => 'color: {{VALUE}};',
                    ),
                     'render_type' => 'template'
                ]
            );

            $this->add_control(
                'readmore_normal_background_color',
                [
                    'label'     => __( 'Background Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .readmore-button' => 'background-color: {{VALUE}};',
                    ),
                     'render_type' => 'template'
                ]
            );

            $this->add_group_control(
                \Elementor\Group_Control_Border::get_type(),
                [
                    'name'     => 'readmore_normal_border',
                    'label'    => __( 'Border', 'fancy-post-grid' ),
                    'selector' => '{{WRAPPER}} .readmore-button',
                ]
            );

            $this->add_control(
                'readmore_normal_border_radius',
                [
                    'label'      => __( 'Border Radius', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', '%' ),
                    'selectors'  => array(
                        '{{WRAPPER}} .readmore-button' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                     'render_type' => 'template'
                ]
            );

            $this->end_controls_tab();

            // Hover Tab
            $this->start_controls_tab(
                'readmore_hover_tab',
                [
                    'label' => __( 'Hover', 'fancy-post-grid' ),
                ]
            );

            $this->add_control(
                'readmore_hover_text_color',
                [
                    'label'     => __( 'Text Color on Hover', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .readmore-button:hover' => 'color: {{VALUE}};',
                    ),
                     'render_type' => 'template'
                ]
            );

            $this->add_control(
                'readmore_hover_background_color',
                [
                    'label'     => __( 'Background Color on Hover', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .readmore-button:hover' => 'background-color: {{VALUE}};',
                    ),
                     'render_type' => 'template'
                ]
            );

            $this->add_group_control(
                \Elementor\Group_Control_Border::get_type(),
                [
                    'name'     => 'readmore_hover_border',
                    'label'    => __( 'Border', 'fancy-post-grid' ),
                    'selector' => '{{WRAPPER}} .readmore-button:hover',
                ]
            );

            $this->add_control(
                'readmore_hover_border_radius',
                [
                    'label'      => __( 'Border Radius on Hover', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', '%' ),
                    'selectors'  => array(
                        '{{WRAPPER}} .readmore-button:hover' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                     'render_type' => 'template'
                ]
            );

            $this->end_controls_tab();

            // Box Hover Tab
            $this->start_controls_tab(
                'readmore_box_hover_tab',
                [
                    'label' => __( 'Box Hover', 'fancy-post-grid' ),
                ]
            );

            $this->add_control(
                'readmore_box_hover_text_color',
                [
                    'label'     => __( 'Text Color on Box Hover', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post:hover .readmore-button' => 'color: {{VALUE}};',
                    ),
                    'render_type' => 'template'
                ]
            );

            $this->add_control(
                'readmore_box_hover_background_color',
                [
                    'label'     => __( 'Background Color on Box Hover', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post:hover .readmore-button' => 'background-color: {{VALUE}};',
                    ),
                    'render_type' => 'template'
                ]
            );

            $this->add_group_control(
                \Elementor\Group_Control_Border::get_type(),
                [                    
                    'name'     => 'readmore_box_hover_border',
                    'label'    => __( 'Border', 'fancy-post-grid' ),
                    'selector' => '{{WRAPPER}} .fancy-post:hover .readmore-button',
                ]
            );

            $this->end_controls_tab();
            $this->end_controls_tabs();

            $this->end_controls_section();

            
            // Slider Style Section
            if (!in_array('slider_style', $this->exclude_controls)) {
                $this->start_controls_section(
                    'slider_style',
                    [
                        'label' => __( 'Slider', 'fancy-post-grid' ),
                        'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
                    ]
                );

                // Add Tabs for Color, Hover, and Active States
                $this->start_controls_tabs('slider_style_tabs');

                // Color Tab
                $this->start_controls_tab(
                    'slider_style_color_tab',
                    [
                        'label' => __( 'Color', 'fancy-post-grid' ),
                    ]
                );

                $this->add_control(
                    'slider_dots_color',
                    [
                        'label'     => __( 'Slider Dots Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .swiper-pagination-bullet' => 'background-color: {{VALUE}};',
                        ],
                    ]
                );

                $this->add_control(
                    'arrow_color',
                    [
                        'label'     => __( 'Arrow Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .swiper-button-next, {{WRAPPER}} .swiper-button-prev' => 'color: {{VALUE}};',
                        ],
                    ]
                );

                $this->add_control(
                    'arrow_background_color',
                    [
                        'label'     => __( 'Arrow Background Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .swiper-button-next, {{WRAPPER}} .swiper-button-prev' => 'background-color: {{VALUE}};',
                        ],
                    ]
                );

                $this->add_control(
                    'fraction_color',
                    [
                        'label'     => __( 'Fraction Active Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .swiper-pagination-fraction' => 'color: {{VALUE}};',
                        ],
                    ]
                );

                $this->add_control(
                    'progress_color',
                    [
                        'label'     => __( 'Progress Active Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .swiper-pagination-progressbar' => 'background-color: {{VALUE}};',
                        ],
                    ]
                );

                $this->end_controls_tab();

                // Hover Tab
                $this->start_controls_tab(
                    'slider_style_hover_tab',
                    [
                        'label' => __( 'Hover', 'fancy-post-grid' ),
                    ]
                );

                $this->add_control(
                    'slider_dots_hover_color',
                    [
                        'label'     => __( 'Slider Dots Hover Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .swiper-pagination-bullet:hover' => 'background-color: {{VALUE}};',
                        ],
                    ]
                );

                $this->add_control(
                    'arrow_hover_color',
                    [
                        'label'     => __( 'Arrow Hover Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .swiper-button-next:hover, {{WRAPPER}} .swiper-button-prev:hover' => 'color: {{VALUE}};',
                        ],
                    ]
                );

                $this->add_control(
                    'arrow_background_hover_color',
                    [
                        'label'     => __( 'Arrow Background Hover Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .swiper-button-next:hover, {{WRAPPER}} .swiper-button-prev:hover' => 'background-color: {{VALUE}};',
                        ],
                    ]
                );

                $this->end_controls_tab();

                // Active Tab
                $this->start_controls_tab(
                    'slider_style_active_tab',
                    [
                        'label' => __( 'Active', 'fancy-post-grid' ),
                    ]
                );

                $this->add_control(
                    'slider_dots_active_color',
                    [
                        'label'     => __( 'Slider Dots Active Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .swiper-pagination-bullet-active' => 'background-color: {{VALUE}};',
                        ],
                    ]
                );

                $this->add_control(
                    'fraction_active_color',
                    [
                        'label'     => __( 'Fraction Active Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .swiper-pagination-fraction .swiper-pagination-current' => 'color: {{VALUE}};',
                        ],
                    ]
                );

                $this->add_control(
                    'progress_active_color',
                    [
                        'label'     => __( 'Progress Active Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .swiper-pagination-progressbar-fill' => 'background-color: {{VALUE}};',
                        ],
                    ]
                );

                $this->end_controls_tab();

                // End Tabs
                $this->end_controls_tabs();

                // Arrow Icon Font Size
                $this->add_control(
                    'arrow_icon_font_size',
                    [
                        'label'     => __( 'Arrow Icon Font Size', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::SLIDER,
                        'size_units' => [ 'px', 'em', '%' ],
                        'range'     => [
                            'px' => [
                                'min' => 10,
                                'max' => 100,
                            ],
                            'em' => [
                                'min' => 1,
                                'max' => 10,
                                'step' => 0.1,
                            ],
                            '%' => [
                                'min' => 10,
                                'max' => 200,
                            ],
                        ],
                        'selectors' => [
                            '{{WRAPPER}} .swiper-button-next, {{WRAPPER}} .swiper-button-prev' => 'font-size: {{SIZE}}{{UNIT}};',
                        ],
                        'default'   => [
                            'unit' => 'px',
                            'size' => 20,
                        ],
                    ]
                );

                $this->end_controls_section();
            }

            // Card (Post Item) Style
            $this->start_controls_section(
                'card_post_item_style',
                [
                    'label' => __( 'Card (Post Item)', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
                ]
            );

            // Card Gap
            $this->add_control(
                'card_gap',
                [
                    'label'      => __( 'Card Gap', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::SLIDER,
                    'size_units' => array( 'px', 'em', '%' ),
                    'range'      => array(
                        'px' => array(
                            'min' => 0,
                            'max' => 100,
                        ),
                    ),
                    'selectors'  => array(
                        '{{WRAPPER}} .fancy-post-card' => 'gap: {{SIZE}}{{UNIT}};',
                    ),
                    'render_type' => 'template'
                ]
            );

            // Content Padding
            $this->add_control(
                'content_padding',
                [
                    'label'      => __( 'Content Padding', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', 'em', '%' ),
                    'selectors'  => array(
                        '{{WRAPPER}} .fancy-post-card' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                    'render_type' => 'template'
                ]
            );

            // Card Border Radius
            $this->add_control(
                'card_border_radius',
                [
                    'label'      => __( 'Border Radius', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::SLIDER,
                    'size_units' => array( 'px', '%' ),
                    'range'      => array(
                        'px' => array(
                            'min' => 0,
                            'max' => 100,
                        ),
                    ),
                    'selectors'  => array(
                        '{{WRAPPER}} .fancy-post-card' => 'border-radius: {{SIZE}}{{UNIT}};',
                    ),
                    'render_type' => 'template'
                ]
            );

            // Enable Border & Box Shadow
            $this->add_control(
                'enable_border_shadow',
                [
                    'label'   => __( 'Enable Border & Box Shadow', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'default' => '',
                    'render_type' => 'template'
                ]
            );

            $this->add_control(
                'border_color',
                [
                    'label'     => __( 'Border Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-card' => 'border-color: {{VALUE}};',
                    ),
                    'condition' => array(
                        'enable_border_shadow' => 'yes',
                    ),
                    'render_type' => 'template'
                ]
            );

            $this->add_group_control(
                \Elementor\Group_Control_Box_Shadow::get_type(),
                [
                    'name'      => 'box_shadow',
                    'label'     => __( 'Box Shadow', 'fancy-post-grid' ),
                    'selector'  => '{{WRAPPER}} .fancy-post-card',
                    'condition' => array(
                        'enable_border_shadow' => 'yes',
                    ),
                    'render_type' => 'template'
                ]
            );

            // Enable Border Bottom
            $this->add_control(
                'enable_border_bottom',
                [
                    'label'   => __( 'Enable Border Bottom', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'default' => '',
                    'render_type' => 'template'
                ]
            );

            $this->add_control(
                'border_bottom_spacing',
                [
                    'label'      => __( 'Border Bottom Spacing', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::SLIDER,
                    'size_units' => array( 'px', '%' ),
                    'range'      => array(
                        'px' => array(
                            'min' => 0,
                            'max' => 100,
                        ),
                    ),
                    'selectors'  => array(
                        '{{WRAPPER}} .fancy-post-card' => 'border-bottom-width: {{SIZE}}{{UNIT}};',
                    ),
                    'condition' => array(
                        'enable_border_bottom' => 'yes',
                    ),
                    'render_type' => 'template'
                ]
            );

            $this->add_control(
                'border_bottom_color',
                [                    
                    'label'     => __( 'Border Bottom Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-card' => 'border-bottom-color: {{VALUE}};',
                    ),
                    'condition' => array(
                        'enable_border_bottom' => 'yes',
                    ),
                    'render_type' => 'template'
                ]
            );

            // Normal & Hover Tabs
            $this->start_controls_tabs('card_background_tabs');

            // Normal Tab
            $this->start_controls_tab(
                'card_normal_tab',
                [
                    'label' => __( 'Normal', 'fancy-post-grid' ),
                ]
            );

            $this->add_control(
                'card_background',
                [
                    'label'     => __( 'Background Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-item' => 'background-color: {{VALUE}};',
                    ),
                    'render_type' => 'template'
                ]
            );


            $this->add_control(
                'card_image',
                [
                    'label'     => __( 'Background Image', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::MEDIA,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-item' => 'background-image: url({{URL}});',
                    ),

                    'render_type' => 'template'
                ]
            );

            $this->end_controls_tab();

            // Hover Tab
            $this->start_controls_tab(
                'card_hover_tab',
                [
                    'label' => __( 'Hover', 'fancy-post-grid' ),
                ]
            );

            $this->add_control(
                'card_background_hover',
                [
                    'label'     => __( 'Background Hover Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-item:hover' => 'background-color: {{VALUE}};',
                    ),
                    'render_type' => 'template'
                ]
            );

            $this->end_controls_tab();

            $this->end_controls_tabs();

            $this->end_controls_section();
        }
        protected function render() {
            // Get the selected grid and slider layouts
            $grid_layout = $this->get_settings_for_display('fancy_post_grid_layout');
            $slider_layout = $this->get_settings_for_display('fancy_post_slider_layout');
            $isotope_layout = $this->get_settings_for_display('fancy_post_isotope_layout');
            $list_layout = $this->get_settings_for_display('fancy_post_list_layout');

            // Render grid layout
            if ($grid_layout === 'gridstyle01') {
                $this->render_grid_style_01();
            } elseif ($grid_layout === 'gridstyle02') {
                $this->render_grid_style_02();
            } elseif ($grid_layout === 'gridstyle03') {
                $this->render_grid_style_03();
            }elseif ($grid_layout === 'gridstyle04') {
                $this->render_grid_style_04();
            } elseif ($grid_layout === 'gridstyle05') {
                $this->render_grid_style_05();
            }elseif ($grid_layout === 'gridstyle06') {
                $this->render_grid_style_06();
            } elseif ($grid_layout === 'gridstyle07') {
                $this->render_grid_style_07();
            }elseif ($grid_layout === 'gridstyle08') {
                $this->render_grid_style_08();
            } elseif ($grid_layout === 'gridstyle09') {
                $this->render_grid_style_09();
            }elseif ($grid_layout === 'gridstyle10') {
                $this->render_grid_style_10();
            }elseif ($grid_layout === 'gridstyle11') {
                $this->render_grid_style_11();
            } elseif ($grid_layout === 'gridstyle12') {
                $this->render_grid_style_12();
            } 

            // Render slider layout
            if ($slider_layout === 'sliderstyle01') {
                $this->render_slider_style_01();
            } elseif ($slider_layout === 'sliderstyle02') {
                $this->render_slider_style_02();
            } elseif ($slider_layout === 'sliderstyle03') {
                $this->render_slider_style_03();
            }elseif ($slider_layout === 'sliderstyle04') {
                $this->render_slider_style_04();
            } elseif ($slider_layout === 'sliderstyle05') {
                $this->render_slider_style_05();
            }elseif ($slider_layout === 'sliderstyle06') {
                $this->render_slider_style_06();
            } elseif ($slider_layout === 'sliderstyle07') {
                $this->render_slider_style_07();
            } 

            // Render isotope layout
            if ($isotope_layout === 'isotopestyle01') {
                $this->render_isotope_style_01();
            } elseif ($isotope_layout === 'isotopestyle02') {
                $this->render_isotope_style_02();
            } elseif ($isotope_layout === 'isotopestyle03') {
                $this->render_isotope_style_03();
            }elseif ($isotope_layout === 'isotopestyle04') {
                $this->render_isotope_style_04();
            } elseif ($isotope_layout === 'isotopestyle05') {
                $this->render_isotope_style_05();
            }elseif ($isotope_layout === 'isotopestyle06') {
                $this->render_isotope_style_06();
            } elseif ($isotope_layout === 'isotopestyle07') {
                $this->render_isotope_style_07();
            } 
        }


        protected function render_grid_style_01() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style-01.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">Grid Style 01 template not found.</div>';
            }
        }

        protected function render_grid_style_02() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style-02.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">Grid Style 02 template not found.</div>';
            }
        }
        protected function render_grid_style_03() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style-03.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">Grid Style 03 template not found.</div>';
            }
        }
        protected function render_grid_style_04() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style-04.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">Grid Style 04 template not found.</div>';
            }
        }
        protected function render_grid_style_05() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style-05.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">Grid Style 05 template not found.</div>';
            }
        }

        protected function render_grid_style_06() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style-06.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">Grid Style 06 template not found.</div>';
            }
        }
        protected function render_grid_style_07() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style-07.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">Grid Style 07 template not found.</div>';
            }
        }
        protected function render_grid_style_08() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style-08.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">Grid Style 08 template not found.</div>';
            }
        }
        protected function render_grid_style_09() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style-09.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">Grid Style 09 template not found.</div>';
            }
        }

        protected function render_grid_style_10() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style-10.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">Grid Style 10 template not found.</div>';
            }
        }
        protected function render_grid_style_11() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style-11.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">Grid Style 11 template not found.</div>';
            }
        }
        protected function render_grid_style_12() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style-12.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">Grid Style 12 template not found.</div>';
            }
        }

        protected function render_slider_style_01() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/slider-style-01.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">Grid Style 02 template not found.</div>';
            }
        }

        protected function render_isotope_style_01() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/isotope-style-01.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">Grid Style 02 template not found.</div>';
            }
        }
        
    }

    // FPG-Grid Layout Widget
    class Fancy_Post_Grid_Layout_Widget extends Fancy_Post_Grid_Base_Widget {
        protected $exclude_controls = ['fancy_post_slider_layout','fancy_post_list_layout','fancy_post_isotope_layout','slider_pagination_type','slider_section','slider_style','col_desktop_slider','col_lg_slider','col_md_slider','col_sm_slider','col_xs_slider'];
        public function get_name() {
            return 'fpg_grid_layout';
        }

        public function get_title() {
            return __('FPG - Grid Layout', 'fancy-post-grid');
        }

        public function get_icon() {
            return 'eicon-gallery-grid';
        }

        public function get_categories() {
            return array('fancy-post-grid-category');
        }
    }

    // FPG-Slider Layout Widget
    class Fancy_Post_Slider_Layout_Widget extends Fancy_Post_Grid_Base_Widget {
        
        // Specify which controls to exclude
        protected $exclude_controls = ['fancy_post_grid_layout', 'fancy_post_list_layout','fancy_post_isotope_layout','columns','show_pagination','col_desktop','col_lg','col_md','col_sm','col_xs'];
        public function get_name() {
            return 'fpg_slider_layout';
        }

        public function get_title() {
            return __('FPG - Slider Layout', 'fancy-post-grid');
        }

        public function get_icon() {
            return 'eicon-gallery-grid';
        }

        public function get_categories() {
            return array('fancy-post-grid-category');
        }
        
    }

    // FPG-ISOTOPE Layout Widget
    class Fancy_Post_Isotope_Layout_Widget extends Fancy_Post_Grid_Base_Widget {
        
        // Specify which controls to exclude
        protected $exclude_controls = ['fancy_post_grid_layout', 'fancy_post_slider_layout','fancy_post_list_layout','slider_columns','slider_pagination_type','slider_section','slider_style'];
        public function get_name() {
            return 'fpg_isotope_layout';
        }

        public function get_title() {
            return __('FPG - Isotope Layout', 'fancy-post-grid');
        }

        public function get_icon() {
            return 'eicon-gallery-grid';
        }

        public function get_categories() {
            return array('fancy-post-grid-category');
        }
        
    }
    // FPG-List Layout Widget
    class Fancy_Post_List_Layout_Widget extends Fancy_Post_Grid_Base_Widget {
        
        // Specify which controls to exclude
        protected $exclude_controls = ['fancy_post_grid_layout', 'fancy_post_slider_layout','fancy_post_isotope_layout','slider_columns','slider_pagination_type','slider_section','slider_style'];
        public function get_name() {
            return 'fpg_list_layout';
        }

        public function get_title() {
            return __('FPG - List Layout', 'fancy-post-grid');
        }

        public function get_icon() {
            return 'eicon-gallery-grid';
        }

        public function get_categories() {
            return array('fancy-post-grid-category');
        }
    }
    

    // Register all widgets
    \Elementor\Plugin::instance()->widgets_manager->register_widget_type(new Fancy_Post_Grid_Layout_Widget());
    \Elementor\Plugin::instance()->widgets_manager->register_widget_type(new Fancy_Post_Slider_Layout_Widget());
    \Elementor\Plugin::instance()->widgets_manager->register_widget_type(new Fancy_Post_Isotope_Layout_Widget());
    \Elementor\Plugin::instance()->widgets_manager->register_widget_type(new Fancy_Post_List_Layout_Widget());
});
