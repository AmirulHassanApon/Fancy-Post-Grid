<?php

add_action('elementor/elements/categories_registered', function ($elements_manager) {
    $elements_manager->add_category(
        'fancy-post-grid-category',
        array(
            'title' => esc_html__('Fancy Post Grid', 'fancy-post-grid'),
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
                    'label' => esc_html__( 'Layout', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
                )
            );

            // Add control for Grid Layout selection 
            // Check if the control is excluded before adding it
            if (!in_array('fancy_post_grid_layout', $this->exclude_controls)) {
                
                $this->add_control(
                    'fancy_post_grid_layout',
                    [
                        'label' => esc_html__( 'Grid Style', 'fancy-post-grid' ),
                        'type' => \Elementor\Controls_Manager::CHOOSE,
                        'classes' => 'fpg-el-control-post-chooser-thumb',
                        'options' => [
                            'gridstyle01' => [
                                'title' => esc_html__( 'Grid Style 01', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-left',
                            ],
                            'gridstyle02' => [
                                'title' => esc_html__( 'Grid Style 02', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-center',
                            ],
                            'gridstyle03' => [
                                'title' => esc_html__( 'Grid Style 03', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'gridstyle04' => [
                                'title' => esc_html__( 'Grid Style 04', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'gridstyle05' => [
                                'title' => esc_html__( 'Grid Style 05', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'gridstyle06' => [
                                'title' => esc_html__( 'Grid Style 06', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'gridstyle07' => [
                                'title' => esc_html__( 'Grid Style 07', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'gridstyle08' => [
                                'title' => esc_html__( 'Grid Style 08', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'gridstyle09' => [
                                'title' => esc_html__( 'Grid Style 09', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'gridstyle10' => [
                                'title' => esc_html__( 'Grid Style 10', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'gridstyle11' => [
                                'title' => esc_html__( 'Grid Style 11', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'gridstyle12' => [
                                'title' => esc_html__( 'Grid Style 12', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                        ],
                        'default' => 'gridstyle01',
                        'toggle' => true,
                    ]
                );
            }
            // Add control for Slider Layout selection 
            // Check if the control is excluded before adding it
            if (!in_array('fancy_post_slider_layout', $this->exclude_controls)) {
                $this->add_control(
                    'fancy_post_slider_layout',
                    [                    
                        'label'   => esc_html__( 'Slider Style', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::CHOOSE,
                        'classes' => 'fpg-el-control-post-chooser-slider-thumb',
                        'options' => [
                            'sliderstyle01' => [
                                'title' => esc_html__( 'Slider Style 01', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-left',
                            ],
                            'sliderstyle02' => [
                                'title' => esc_html__( 'Slider Style 02', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-center',
                            ],
                            'sliderstyle03' => [
                                'title' => esc_html__( 'Slider Style 03', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'sliderstyle04' => [
                                'title' => esc_html__( 'Slider Style 04', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'sliderstyle05' => [
                                'title' => esc_html__( 'Slider Style 05', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'sliderstyle06' => [
                                'title' => esc_html__( 'Slider Style 06', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'sliderstyle07' => [
                                'title' => esc_html__( 'Slider Style 07', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                        ],
                        'default' => 'sliderstyle01',
                        'toggle' => true,
                    ]
                );
            }
            // Add control for Isotope Layout selection 
            // Check if the control is excluded before adding it
            if (!in_array('fancy_post_isotope_layout', $this->exclude_controls)) {
                $this->add_control(
                    'fancy_post_isotope_layout',
                    [                    
                        'label'   => esc_html__( 'Isotope Style', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::CHOOSE,
                        'classes' => 'fpg-el-control-post-chooser-isotope-thumb',
                        'options' => [
                            'isotopestyle01' => [
                                'title' => esc_html__( 'Isotope Style 01', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-left',
                            ],
                            'isotopestyle02' => [
                                'title' => esc_html__( 'Isotope Style 02', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-center',
                            ],
                            'isotopestyle03' => [
                                'title' => esc_html__( 'Isotope Style 03', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'isotopestyle04' => [
                                'title' => esc_html__( 'Isotope Style 04', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'isotopestyle05' => [
                                'title' => esc_html__( 'Isotope Style 05', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'isotopestyle06' => [
                                'title' => esc_html__( 'Isotope Style 06', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'isotopestyle07' => [
                                'title' => esc_html__( 'Isotope Style 07', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                        ],
                        'default' => 'isotopestyle01',
                        'toggle' => true,
                    ]
                );
            }
            // Add control for List Layout selection 
            // Check if the control is excluded before adding it
            if (!in_array('fancy_post_list_layout', $this->exclude_controls)) {
                $this->add_control(
                    'fancy_post_list_layout',
                    [                    
                        'label'   => esc_html__( 'List Style', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::CHOOSE,
                        'classes' => 'fpg-el-control-post-chooser-list-thumb',
                        'options' => [
                            'liststyle01' => [
                                'title' => esc_html__( 'List Style 01', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-left',
                            ],
                            'liststyle02' => [
                                'title' => esc_html__( 'List Style 02', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-center',
                            ],
                            'liststyle03' => [
                                'title' => esc_html__( 'List Style 03', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'liststyle04' => [
                                'title' => esc_html__( 'List Style 04', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'liststyle05' => [
                                'title' => esc_html__( 'List Style 05', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'liststyle06' => [
                                'title' => esc_html__( 'List Style 06', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'liststyle07' => [
                                'title' => esc_html__( 'List Style 07', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'liststyle08' => [
                                'title' => esc_html__( 'List Style 08', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                        ],
                        
                        'default' => 'liststyle01',
                        'toggle' => true,
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
                            '12' => esc_html__('1 Column', 'fancy-post-grid'),
                            '6' => esc_html__('2 Columns', 'fancy-post-grid'),
                            '4' => esc_html__('3 Columns', 'fancy-post-grid'),
                            '3' => esc_html__('4 Columns', 'fancy-post-grid'),
                            '2' => esc_html__('6 Columns', 'fancy-post-grid'),
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
            
            if (!in_array('col_lg', $this->exclude_controls)) {
                $this->add_control(
                    'col_lg',
                    [
                        'label'   => esc_html__('Large 1199px to 992px', 'fancy-post-grid'),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'label_block' => true,
                        'default' => 3,
                        'options' => [
                            '12' => esc_html__('1 Column', 'fancy-post-grid'),
                            '6' => esc_html__('2 Columns', 'fancy-post-grid'),
                            '4' => esc_html__('3 Columns', 'fancy-post-grid'),
                            '3' => esc_html__('4 Columns', 'fancy-post-grid'),
                            '2' => esc_html__('6 Columns', 'fancy-post-grid'),
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
                            '12' => esc_html__('1 Column', 'fancy-post-grid'),
                            '6' => esc_html__('2 Columns', 'fancy-post-grid'),
                            '4' => esc_html__('3 Columns', 'fancy-post-grid'),
                            '3' => esc_html__('4 Columns', 'fancy-post-grid'),
                            '2' => esc_html__('6 Columns', 'fancy-post-grid'),
                            'auto' => esc_html__('Auto', 'fancy-post-grid'),
                        ],
                        'separator' => 'before',
                    ]
                );
            }
            
            if (!in_array('col_md', $this->exclude_controls)) {
                $this->add_control(
                    'col_md',
                    [
                        'label'   => esc_html__('Medium 991px to 768px', 'fancy-post-grid'),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'label_block' => true,
                        'default' => 3,
                        'options' => [
                            '12' => esc_html__('1 Column', 'fancy-post-grid'),
                            '6' => esc_html__('2 Columns', 'fancy-post-grid'),
                            '4' => esc_html__('3 Columns', 'fancy-post-grid'),
                            '3' => esc_html__('4 Columns', 'fancy-post-grid'),
                            '2' => esc_html__('6 Columns', 'fancy-post-grid'),
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
            
            if (!in_array('col_sm', $this->exclude_controls)) {
                $this->add_control(
                    'col_sm',
                    [
                        'label'   => esc_html__('Small 767px to 576px', 'fancy-post-grid'),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'label_block' => true,
                        'default' => 12,
                        'options' => [
                            '12' => esc_html__('1 Column', 'fancy-post-grid'),
                            '6' => esc_html__('2 Columns', 'fancy-post-grid'),
                            '4' => esc_html__('3 Columns', 'fancy-post-grid'),
                            '3' => esc_html__('4 Columns', 'fancy-post-grid'),
                            '2' => esc_html__('6 Columns', 'fancy-post-grid'),
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
            
            if (!in_array('col_xs', $this->exclude_controls)) {
                $this->add_control(
                    'col_xs',
                    [
                        'label'   => esc_html__('Mobile Below 575px', 'fancy-post-grid'),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'label_block' => true,
                        'default' => 2,
                        'options' => [
                            '12' => esc_html__('1 Column', 'fancy-post-grid'),
                            '6' => esc_html__('2 Columns', 'fancy-post-grid'),
                            '4' => esc_html__('3 Columns', 'fancy-post-grid'),
                            '3' => esc_html__('4 Columns', 'fancy-post-grid'),
                            '2' => esc_html__('6 Columns', 'fancy-post-grid'),
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

            $this->end_controls_section();
            // Layout Section
            $this->start_controls_section(
                'query_builder_section',
                [
                    'label' => esc_html__( 'Query Builder', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
                ]
            );
            // Add Query Builder options
            $this->add_control(
                'category_filter',
                [
                    'label'   => esc_html__( 'Select Category', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT2,
                    'options' => $this->get_categories_list(),
                    'label_block' => true,
                    'multiple' => true,
                ]
            );

            $this->add_control(
                'tag_filter',
                [
                    'label'   => esc_html__( 'Select Tags', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT2,
                    'options' => $this->get_tags_list(),
                    'label_block' => true,
                    'multiple' => true,
                ]
            );

            $this->add_control(
                'author_filter',
                [
                    'label'   => esc_html__( 'Select Author', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT2,
                    'options' => $this->get_authors_list(),
                    'label_block' => true,
                ]
            );

            // Sorting options
            $this->add_control(
                'sort_order',
                [                    
                    'label'   => esc_html__( 'Sort Order', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'desc' => esc_html__( 'Descending', 'fancy-post-grid' ),
                        'asc'  => esc_html__( 'Ascending', 'fancy-post-grid' ),
                    ),
                    'default' => 'desc',
                ]
            );

            // Number of posts per page
            $this->add_control(
                'posts_per_page',
                [                    
                    'label'       => esc_html__( 'Posts per Page', 'fancy-post-grid' ),
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
                    'label'   => esc_html__( 'Include Posts (IDs)', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::TEXT,
                    'description' => esc_html__( 'Enter post IDs separated by commas', 'fancy-post-grid' ),
                ]
            );

            $this->add_control(
                'exclude_posts',
                [
                    'label'   => esc_html__( 'Exclude Posts (IDs)', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::TEXT,
                    'description' => esc_html__( 'Enter post IDs separated by commas', 'fancy-post-grid' ),
                ]
            );

            $this->end_controls_section();
            // Pagination Section
            if (!in_array('show_pagination_on', $this->exclude_controls)) {
                $this->start_controls_section(
                    'pagination_section',
                    [
                        'label' => esc_html__( 'Pagination', 'fancy-post-grid' ),
                        'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
                    ]
                );
                // Check if the control is excluded before adding it
                if (!in_array('show_pagination', $this->exclude_controls)) {
                    $this->add_control(
                        'show_pagination',
                        [
                            'label'       => esc_html__( 'Show Pagination', 'fancy-post-grid' ),
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
                            'label'   => esc_html__( 'Pagination Type', 'fancy-post-grid' ),
                            'type'    => \Elementor\Controls_Manager::SELECT,
                            'options' => [
                                'bullets'  => esc_html__( 'Bullets', 'fancy-post-grid' ),
                                'fraction' => __( 'Fraction', 'fancy-post-grid' ),
                                'progressbar' => __( 'Progress', 'fancy-post-grid' ),
                            ],
                            'default' => 'bullets',
                            
                            'render_type' => 'template',
                        ]
                    );
                }
                $this->end_controls_section();
            }

            // Slider Section
            // Check if the control is excluded before adding it
            if (!in_array('slider_section', $this->exclude_controls)) {
                $this->start_controls_section(
                    'slider_section',
                    [
                        'label' => esc_html__( 'Slider', 'fancy-post-grid' ),
                        'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
                    ]
                );

                // Enable Arrow Control
                $this->add_control(
                    'show_arrow_control',
                    [
                        'label'       => esc_html__( 'Enable Arrow Control', 'fancy-post-grid' ),
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
                        'label'       => esc_html__( 'Enable Pagination Control', 'fancy-post-grid' ),
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
                        'label'       => esc_html__( 'Enable Keyboard Control', 'fancy-post-grid' ),
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
                        'label'       => esc_html__( 'Enable Looping', 'fancy-post-grid' ),
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
                        'label'       => esc_html__( 'Enable Free Mode', 'fancy-post-grid' ),
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
                        'label'       => esc_html__( 'Pagination Clickable Mode', 'fancy-post-grid' ),
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
                        'label'       => esc_html__( 'Auto Play Speed (ms)', 'fancy-post-grid' ),
                        'type'        => \Elementor\Controls_Manager::NUMBER,
                        'min'         => 100,
                        'step'        => 100,
                        'default'     => 3000,
                        'description' => esc_html__( 'Speed in milliseconds', 'fancy-post-grid' ),
                    ]
                );

                // Slider Item Gap
                $this->add_control(
                    'slider_item_gap',
                    [
                        'label'       => esc_html__( 'Slider Item Gap', 'fancy-post-grid' ),
                        'type'        => \Elementor\Controls_Manager::NUMBER,
                        'min'         => 0,
                        'step'        => 1,
                        'default'     => 10,
                        'description' => esc_html__( 'Gap between items in pixels', 'fancy-post-grid' ),
                        'selectors'   => [
                            '{{WRAPPER}} .fancy-post-item' => 'gap: {{VALUE}}px;', // Dynamically adds gap
                        ],
                    ]
                );

                $this->end_controls_section();
            }

            // Isotope Section
            // Check if the control is excluded before adding it
            if (!in_array('isotope_section', $this->exclude_controls)) {
                $this->start_controls_section(
                    'isotope_section',
                    [
                        'label' => esc_html__('Isotope', 'fancy-post-grid'),
                        'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
                    ]
                );

                // Add filter_alignment control
                $this->add_control(
                    'filter_alignment',
                    [
                        'label'   => esc_html__('Filter Alignment', 'fancy-post-grid'),
                        'type'    => \Elementor\Controls_Manager::CHOOSE,
                        'options' => [
                            'left'   => [
                                'title' => esc_html__('Left', 'fancy-post-grid'),
                                'icon'  => 'eicon-text-align-left',
                            ],
                            'center' => [
                                'title' => esc_html__('Center', 'fancy-post-grid'),
                                'icon'  => 'eicon-text-align-center',
                            ],
                            'right'  => [
                                'title' => esc_html__('Right', 'fancy-post-grid'),
                                'icon'  => 'eicon-text-align-right',
                            ],
                        ],
                        'default' => 'center',
                        'toggle'  => true,
                        'selectors' => array(
                            '{{WRAPPER}} .rs-blog-layout-filter' => 'justify-content: {{VALUE}};',
                        ),
                    ]
                );

                // Add filter_all_text control
                $this->add_control(
                    'filter_all_text',
                    [
                        'label'       => esc_html__('All Filter Text', 'fancy-post-grid'),
                        'type'        => \Elementor\Controls_Manager::TEXT,
                        'default'     => esc_html__('All', 'fancy-post-grid'),
                        'placeholder' => esc_html__('Enter text for "All" filter', 'fancy-post-grid'),
                    ]
                );

                $this->end_controls_section();
            }

            // Links Section
            $this->start_controls_section(
                'link_section',
                [
                    'label' => esc_html__( 'Links', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
                ]
            );
            $this->add_control(
                'link_type',
                [
                    'label'   => esc_html__( 'Post link type', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'link_details' => esc_html__( 'Link to details page', 'fancy-post-grid' ),
                        'no_link'  => esc_html__( 'No Link', 'fancy-post-grid' ),
                    ),
                    'default' => 'link_details',
                ]
            );
            $this->add_control(
                'link_target',
                [                    'label'   => esc_html__( 'Link Target', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'same_window' => esc_html__( 'Same Window', 'fancy-post-grid' ),
                        'new_window'  => esc_html__( 'New Window', 'fancy-post-grid' ),
                    ),
                    'default' => 'same_window',
                ]
            );
            $this->add_control(
                'thumbnail_link',
                array(
                    'label'       => esc_html__( 'Thumbnail Link', 'fancy-post-grid' ),
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
                    'label' => esc_html__( 'Field Selection', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_SETTINGS,
                ]
            );
            // Show/Hide controls for Post Elements
            $this->add_control(
                'show_post_title',
                [
                    'label'   => esc_html__( 'Show Post Title', 'fancy-post-grid' ),
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
                    'label'   => esc_html__( 'Show Thumbnail', 'fancy-post-grid' ),
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
                    'label'       => esc_html__( 'Show Post Excerpt', 'fancy-post-grid' ),
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
                    'label'       => esc_html__( 'Show Read More Button', 'fancy-post-grid' ),
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
                    'label'   => esc_html__( 'Meta Data', 'fancy-post-grid' ),
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
                    'label'   => esc_html__( '- Show Post Date', 'fancy-post-grid' ),
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
                    'label'   => esc_html__( '- Show Post Author', 'fancy-post-grid' ),
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
                    'label'   => esc_html__( '- Show Post Categories', 'fancy-post-grid' ),
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
                    'label'   => esc_html__( '- Show Post Tags', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                    'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                    'return_value' => 'yes',
                    'default' => 'no',
                    'render_type' => 'template'
                ]
            );

            $this->add_control(
                'show_comments_count',
                [
                    'label'   => esc_html__( '- Show Comments Count', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                    'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                    'return_value' => 'yes',
                    'default' => 'no',
                    'render_type' => 'template'
                ]
            );
            $this->add_control(
                'show_meta_data_icon',
                [
                    'label'   => esc_html__( 'Meta Icon', 'fancy-post-grid' ),
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
                    'label'   => esc_html__( '- Show Post Date  Icon ', 'fancy-post-grid' ),
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
                    'label'   => esc_html__( '- Show Post Author  Icon', 'fancy-post-grid' ),
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
                    'label'   => esc_html__( '- Show Post Categories Icon', 'fancy-post-grid' ),
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
                    'label'   => esc_html__( '- Show Post Tags Icon', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                    'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                    'return_value' => 'yes',
                    'default' => 'no',
                    'render_type' => 'template'
                ]
            );

            $this->add_control(
                'show_comments_count_icon',
                [
                    'label'   => esc_html__( '- Show Comments Count Icon', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                    'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                    'return_value' => 'yes',
                    'default' => 'no',
                    'render_type' => 'template'
                ]
            );

            $this->end_controls_section();

            // Item Order
            $this->start_controls_section(
                'item_order',
                [
                    'label' => esc_html__( 'Item Order', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_SETTINGS,
                ]
            );

            // Item Order: Meta
            $this->add_responsive_control(
                'meta_order',
                [
                    'label'      => esc_html__( 'Meta', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::SLIDER,
                    'selectors'  => [
                        '{{WRAPPER}} .fpg-section-area .meta-data-list,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-category' => 'order: {{SIZE}};',
                    ],
                ]
            );

            // Item Order: Title
            $this->add_responsive_control(
                'title_order',
                [
                    'label'      => esc_html__( 'Title', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::SLIDER,
                    'selectors'  => [
                        '{{WRAPPER}} .fpg-section-area .fancy-post-title' => 'order: {{SIZE}};',
                    ],
                ]
            );

            // Item Order: Excerpt
            $this->add_responsive_control(
                'excerpt_order',
                [
                    'label'      => esc_html__( 'Excerpt', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::SLIDER,
                    'selectors'  => [
                        '{{WRAPPER}} .fpg-section-area .fpg-excerpt' => 'order: {{SIZE}};',
                    ],
                ]
            );

            // Item Order: Button
            $this->add_responsive_control(
                'button_order',
                [
                    'label'      => esc_html__( 'Button', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::SLIDER,
                    'selectors'  => [
                        '{{WRAPPER}} .fpg-section-area .btn-wrapper,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-blog-footer' => 'order: {{SIZE}};',
                    ],
                ]
            );

            $this->end_controls_section();
            // Post Title
            $this->start_controls_section(
                'post_title',
                [
                    'label' => esc_html__( ' Post Title', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_SETTINGS,
                ]
            );
            $this->add_control(
                'title_tag',
                [
                    'label'   => esc_html__( 'Title Tag', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'h1' => esc_html__( 'H1', 'fancy-post-grid' ),
                        'h2'  => esc_html__( 'H2', 'fancy-post-grid' ),
                        'h3' => esc_html__( 'H3', 'fancy-post-grid' ),
                        'h4'  => esc_html__( 'H4', 'fancy-post-grid' ),
                        'h5' => esc_html__( 'H5', 'fancy-post-grid' ),
                        'h6'  => esc_html__( 'H6', 'fancy-post-grid' ),
                    ),
                    'default' => 'h3',
                    'render_type' => 'template'
                ]
            );
            // Show/Hide Title Hover Underline
            $this->add_control(
                'title_hover_underline',
                [
                    'label'   => esc_html__( 'Title Hover Underline', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'enable' => esc_html__( 'Enable', 'fancy-post-grid' ),
                        'disable'  => esc_html__( 'Disable', 'fancy-post-grid' ),
                    ),
                    'default' => 'enable',
                    'render_type' => 'template'
                ]
            );

            // Title Crop By
            $this->add_control(
                'title_crop_by',
                [
                    'label'   => esc_html__( 'Title Crop By', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'character' => esc_html__( 'Character', 'fancy-post-grid' ),
                        'word' => esc_html__( 'Word', 'fancy-post-grid' ),
                    ),
                    'default' => 'character',
                    'render_type' => 'template'
                ]
            );

            // Title Length
            $this->add_control(
                'title_length',
                [
                    'label'   => esc_html__( 'Title Length', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::NUMBER,
                    'default' => 30,
                    'min'     => 1,
                ]
            );

            $this->end_controls_section();
            // Thumbnail Section
            $this->start_controls_section(
                'thumbnail',
                [
                    'label' => esc_html__( ' Thumbnail', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_SETTINGS,
                ]
            );
            
            // Thumbnail Main Styling
            if (!in_array('thumbnail_size', $this->exclude_controls)) {
                $this->add_control(
                    'thumbnail_size',
                    [
                        'label'   => esc_html__( 'Thumbnail Size', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'options' => array(
                            'thumbnail'  => esc_html__( 'Thumbnail', 'fancy-post-grid' ),
                            'medium'     => esc_html__( 'Medium', 'fancy-post-grid' ),
                            'large'      => esc_html__( 'Large', 'fancy-post-grid' ),
                            'full'       => esc_html__( 'Full', 'fancy-post-grid' ),
                            'fancy_post_custom_size'=> esc_html__( 'Custom Size (768x500)', 'fancy-post-grid' ),
                            'fancy_post_square'     => esc_html__( 'Square(500x500)', 'fancy-post-grid' ),
                            'fancy_post_landscape'  => esc_html__( 'Landscape(834x550)', 'fancy-post-grid' ),
                            'fancy_post_portrait'   => esc_html__( 'Portrait(421x550)', 'fancy-post-grid' ),
                            'fancy_post_list'       => esc_html__( 'List Size(1200 x 650)', 'fancy-post-grid' ),
                        ),
                        // 'default' => 'full',
                        'render_type' => 'template'
                    ]
                );
            }
            // Thumbnail Left Styling
            if (!in_array('thumbnail_left_size', $this->exclude_controls)) {
                $this->add_control(
                    'thumbnail_left_size',
                    [
                        'label'   => esc_html__( 'Left Thumbnail Size', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'options' => array(
                            'thumbnail'  => esc_html__( 'Thumbnail', 'fancy-post-grid' ),
                            'medium'     => esc_html__( 'Medium', 'fancy-post-grid' ),
                            'large'      => esc_html__( 'Large', 'fancy-post-grid' ),
                            'full'       => esc_html__( 'Full', 'fancy-post-grid' ),
                            'fancy_post_custom_size'=> esc_html__( 'Custom Size (768x500)', 'fancy-post-grid' ),
                            'fancy_post_square'     => esc_html__( 'Square(500x500)', 'fancy-post-grid' ),
                            'fancy_post_landscape'  => esc_html__( 'Landscape(834x550)', 'fancy-post-grid' ),
                            'fancy_post_portrait'   => esc_html__( 'Portrait(421x550)', 'fancy-post-grid' ),
                            'fancy_post_list'       => esc_html__( 'List Size(1200 x 650)', 'fancy-post-grid' ),
                        ),
                        // 'default' => 'full',
                        'render_type' => 'template'
                    ]
                );
            }// Thumbnail Left Styling
            if (!in_array('thumbnail_right_size', $this->exclude_controls)) {
                $this->add_control(
                    'thumbnail_right_size',
                    [
                        'label'   => esc_html__( 'Right Thumbnail Size', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'options' => array(
                            'thumbnail'  => esc_html__( 'Thumbnail', 'fancy-post-grid' ),
                            'medium'     => esc_html__( 'Medium', 'fancy-post-grid' ),
                            'large'      => esc_html__( 'Large', 'fancy-post-grid' ),
                            'full'       => esc_html__( 'Full', 'fancy-post-grid' ),
                            'fancy_post_custom_size'=> esc_html__( 'Custom Size (768x500)', 'fancy-post-grid' ),
                            'fancy_post_square'     => esc_html__( 'Square(500x500)', 'fancy-post-grid' ),
                            'fancy_post_landscape'  => esc_html__( 'Landscape(834x550)', 'fancy-post-grid' ),
                            'fancy_post_portrait'   => esc_html__( 'Portrait(421x550)', 'fancy-post-grid' ),
                            'fancy_post_list'       => esc_html__( 'List Size(1200 x 650)', 'fancy-post-grid' ),
                        ),
                        // 'default' => 'full',
                        'render_type' => 'template'
                    ]
                );
            }
            $this->add_control(
                'hover_animation',
                [
                    'label'   => esc_html__( 'Hover Animation', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        '' => esc_html__( 'None', 'fancy-post-grid' ),
                        'hover-zoom_in' => esc_html__( 'Zoom In', 'fancy-post-grid' ),
                        'hover-zoom_out' => esc_html__( 'Zoom Out', 'fancy-post-grid' ),
                    ),
                    'default' => 'hover-zoom_in',
                    'render_type' => 'template'
                ]
            );

            $this->end_controls_section();

            // Excerpt / Content Section
            $this->start_controls_section(
                'excerpt_content',
                [
                    'label' => esc_html__( ' Excerpt / Content', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_SETTINGS,
                ]
            );
            // Excerpt Type
            $this->add_control(
                'excerpt_type',
                [
                    'label'   => esc_html__( 'Excerpt Type', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'character' => esc_html__( 'Character', 'fancy-post-grid' ),
                        'word' => esc_html__( 'Word', 'fancy-post-grid' ),
                        'full_content' => esc_html__( 'Full Content', 'fancy-post-grid' ),
                    ),
                    'default' => 'word',
                    'render_type' => 'template'
                ]
            );
            // Excerpt Limit
            $this->add_control(
                'excerpt_length',
                [
                    'label'   => esc_html__( 'Excerpt Limit', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::NUMBER,
                    'default' => 10,
                    'min'     => 1,
                ]
            );
            // Excerpt Limit
            $this->add_control(
                'expansion_indicator',
                [
                    'label'   => esc_html__( 'Expansion Indicator', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::TEXT,
                    'default' => '...',    
                ]
            );

            $this->end_controls_section();

            // Meta Data Section
            $this->start_controls_section(
                'meta_data_content',
                [
                    'label' => esc_html__( 'Meta Data', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_SETTINGS,
                ]
            );

            // Author Prefix
            $this->add_control(
                'author_prefix',
                [
                    'label'       => esc_html__( 'Author Prefix', 'fancy-post-grid' ),
                    'type'        => \Elementor\Controls_Manager::TEXT,
                    'default'     => esc_html__( 'By', 'fancy-post-grid' ),
                    'placeholder' => esc_html__( 'Enter prefix text', 'fancy-post-grid' ),
                ]
            );
            // Meta Separator
            $this->add_control(
                'meta_separator',
                [
                    'label'   => esc_html__( 'Meta Separator', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'default' => 'none', // Default value
                    'options' => [
                        'none'        => esc_html__( 'None', 'fancy-post-grid' ),
                        'dot'         => esc_html__( 'Dot (·)', 'fancy-post-grid' ),
                        'hyphen'      => esc_html__( 'Hyphen (-)', 'fancy-post-grid' ),
                        'slash'       => esc_html__( 'Single Slash (/)', 'fancy-post-grid' ),
                        'double_slash'=> esc_html__( 'Double Slash (//)', 'fancy-post-grid' ),
                        'pipe'        => esc_html__( 'Vertical Pipe (|)', 'fancy-post-grid' ),
                    ],
                    'description' => esc_html__( 'Select the separator to display between meta data items.', 'fancy-post-grid' ),
                ]
            );

            // Author Icon Visibility
            $this->add_control(
                'author_icon_visibility',
                [
                    'label'        => esc_html__( 'Show Author Icon', 'fancy-post-grid' ),
                    'type'         => \Elementor\Controls_Manager::SWITCHER,
                    'label_on'     => esc_html__( 'Show', 'fancy-post-grid' ),
                    'label_off'    => esc_html__( 'Hide', 'fancy-post-grid' ),
                    'return_value' => 'yes',
                    'default'      => 'yes',
                ]
            );

            // Author Image/Icon Selection
            $this->add_control(
                'author_image_icon',
                [
                    'label'   => esc_html__( 'Author Image/Icon', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'image' => esc_html__( 'Image', 'fancy-post-grid' ),
                        'icon'  => esc_html__( 'Icon', 'fancy-post-grid' ),
                    ),
                    'default' => 'icon',
                    'condition' => array(
                        'author_icon_visibility' => 'yes',
                    ),
                ]
            );


            $this->end_controls_section();

            // Button Section
            $this->start_controls_section(
                'read_more_content',
                [
                    'label' => esc_html__( 'Button', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_SETTINGS,
                ]
            );
            
            // Button Type
            $this->add_control(
                'button_type',
                [
                    'label'   => esc_html__( 'Button Style', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'fpg-filled' => esc_html__( 'Filled', 'fancy-post-grid' ),
                        'fpg-border' => esc_html__( 'Border', 'fancy-post-grid' ),
                        'fpg-flat' => esc_html__( 'Flat', 'fancy-post-grid' ),
                    ),
                    
                ]
            );
            // Read More Label
            $this->add_control(
                'read_more_label',
                [
                    'label'   => esc_html__( 'Read More Label', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::TEXT,
                    'default' => 'Read More',    
                ]
            );   

            // Show Button Icon
            $this->add_control(
                'button_icon',
                [
                    'label'   => esc_html__( 'Show Button Icon', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                    'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                    'return_value' => 'yes',
                    'default' => 'yes',
                    'render_type' => 'template'
                ]
            );
               
            // Icon Position
            $this->add_control(
                'button_position',
                [
                    'label'   => esc_html__( 'Icon Position', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'button_position_right' => esc_html__( 'Right', 'fancy-post-grid' ),
                        'button_position_left'  => esc_html__( 'Left', 'fancy-post-grid' ),
                    ),
                    'default' => 'button_position_right',
                    'condition' => array(
                        'button_icon' => 'yes',
                    ),
                    'render_type' => 'template'
                ]
            );

            $this->end_controls_section();

            // Card (Post Item) Style

            // Style Section
            $this->start_controls_section(
                'section_style_style',
                [
                    'label' => esc_html__( 'Section Area', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
                ]
            );

            // Background Color
            $this->add_control(
                'section_background_color',
                [
                    'label'     => esc_html__( 'Background Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .fpg-section-area' => 'background-color: {{VALUE}};',
                        
                    ],
                ]
            );

            // Margin
            $this->add_responsive_control(
                'section_margin',
                [
                    'label'      => esc_html__( 'Margin', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => [ 'px', 'em', '%' ],
                    'selectors'  => [
                        '{{WRAPPER}} .fpg-section-area' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ],
                ]
            );

            // Padding
            $this->add_responsive_control(
                'section_padding',
                [
                    'label'      => esc_html__( 'Padding', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => [ 'px', 'em', '%' ],
                    'selectors'  => [
                        '{{WRAPPER}} .fpg-section-area' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ],
                ]
            );

            $this->end_controls_section();

            $this->start_controls_section(
                'card_post_item_style',
                [
                    'label' => esc_html__( 'Item Box', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
                ]
            );

            // Content Padding
            $this->add_responsive_control(
                'item_padding',
                [
                    'label'      => esc_html__( 'Padding', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', 'em', '%' ),
                    'selectors'  => array(
                        '{{WRAPPER}} .fpg-section-area .rs-blog__single, {{WRAPPER}} .rs-blog-layout-1 .blog-item, {{WRAPPER}} .rs-blog-layout-30-item, {{WRAPPER}} .rs-blog-layout-28-item,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item,{{WRAPPER}} .rs-blog__left-blog,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap,{{WRAPPER}} .rs-blog-layout-17-item,{{WRAPPER}} .rs-blog-layout-20-item,{{WRAPPER}} .rs-blog-layout-22-item,{{WRAPPER}} .rs-blog-layout-24-item,{{WRAPPER}} .rs-blog-layout-25-item,{{WRAPPER}} .rs-blog-layout-27-list-item,{{WRAPPER}} .rs-blog-layout-27-item' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                ]
            );
            // Content Padding
            $this->add_responsive_control(
                'item_margin',
                [
                    'label'      => esc_html__( 'Margin', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', 'em', '%' ),
                    'selectors'  => array(
                        '{{WRAPPER}} .fpg-section-area .rs-blog__single, {{WRAPPER}} .rs-blog-layout-1 .blog-item, {{WRAPPER}} .rs-blog-layout-30-item, {{WRAPPER}} .rs-blog-layout-28-item,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item,{{WRAPPER}} .rs-blog__left-blog,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap,{{WRAPPER}} .rs-blog-layout-17-item,{{WRAPPER}} .rs-blog-layout-20-item,{{WRAPPER}} .rs-blog-layout-22-item,{{WRAPPER}} .rs-blog-layout-24-item,{{WRAPPER}} .rs-blog-layout-25-item,{{WRAPPER}} .rs-blog-layout-27-list-item,{{WRAPPER}} .rs-blog-layout-27-item' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                ]
            );

            // Card Border Radius
            $this->add_responsive_control(
                'card_border_radius',
                [
                    'label'      => esc_html__( 'Border Radius', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', 'em', '%' ),
                    'selectors'  => array(
                        '{{WRAPPER}} .fpg-section-area .rs-blog__single, {{WRAPPER}} .rs-blog-layout-1 .blog-item, {{WRAPPER}} .rs-blog-layout-30-item, {{WRAPPER}} .rs-blog-layout-28-item,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item,{{WRAPPER}} .rs-blog__left-blog,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap,{{WRAPPER}} .rs-blog-layout-17-item,{{WRAPPER}} .rs-blog-layout-20-item,{{WRAPPER}} .rs-blog-layout-22-item,{{WRAPPER}} .rs-blog-layout-24-item,{{WRAPPER}} .rs-blog-layout-25-item,{{WRAPPER}} .rs-blog-layout-27-list-item,{{WRAPPER}} .rs-blog-layout-27-item' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                ]
            );
            // Add control for Box Alignment
            $this->add_control(
                'box_alignment',
                [
                    'label'   => esc_html__( 'Box Alignment', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::CHOOSE,
                    'options' => array(
                        'start'   => array(
                            'title' => esc_html__( 'Left', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-left', // Elementor's built-in icon
                        ),
                        'center' => array(
                            'title' => esc_html__( 'Center', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-center', // Elementor's built-in icon
                        ),
                        'end'  => array(
                            'title' => esc_html__( 'Right', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-right', // Elementor's built-in icon
                        ),
                    ),
                    'render_type' => 'template'
                    // 'selectors' => array(
                    //     '{{WRAPPER}} .fpg-section-area .rs-blog__single, {{WRAPPER}} .rs-blog-layout-1 .blog-item, {{WRAPPER}} .rs-blog__left-blog ' => 'text-align: {{VALUE}};',
                    // ),
                ]
            );

            // Normal & Hover Tabs
            $this->start_controls_tabs('card_background_tabs');

            // Normal Tab
            $this->start_controls_tab(
                'card_normal_tab',
                [
                    'label' => esc_html__( 'Normal', 'fancy-post-grid' ),
                ]
            );
            
            $this->add_control(
                'item_card_background',
                [
                    'label'     => esc_html__( 'Background Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .fpg-section-area .rs-blog__single,{{WRAPPER}} .rs-blog-layout-26 .rs-blog-layout-26-item .rs-content, {{WRAPPER}} .rs-blog-layout-1 .blog-item, {{WRAPPER}} .rs-blog-layout-30-item, {{WRAPPER}} .rs-blog-layout-28-item,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item,{{WRAPPER}} .rs-blog__left-blog,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap,{{WRAPPER}} .rs-blog-layout-17-item,{{WRAPPER}} .rs-blog-layout-20-item,{{WRAPPER}} .rs-blog-layout-22-item,{{WRAPPER}} .rs-blog-layout-24-item,{{WRAPPER}} .rs-blog-layout-25-item,{{WRAPPER}} .rs-blog-layout-27-list-item,{{WRAPPER}} .rs-blog-layout-27-item' => 'background-color: {{VALUE}};',
                        '{{WRAPPER}} .pre-blog-item.style_12:after' => 'border-color: {{VALUE}};',
                    ],
                ]
            );
            $this->add_group_control(
                \Elementor\Group_Control_Border::get_type(),
                [
                    'name' => 'item_border_color',
                    'selector' => '{{WRAPPER}} .fpg-section-area .rs-blog__single, {{WRAPPER}} .rs-blog-layout-1 .blog-item, {{WRAPPER}} .rs-blog-layout-30-item,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item,{{WRAPPER}} .rs-blog__left-blog,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap,{{WRAPPER}} .rs-blog-layout-17-item,{{WRAPPER}} .rs-blog-layout-20-item,{{WRAPPER}} .rs-blog-layout-22-item,{{WRAPPER}} .rs-blog-layout-24-item,{{WRAPPER}} .rs-blog-layout-25-item,{{WRAPPER}} .rs-blog-layout-27-list-item,{{WRAPPER}} .rs-blog-layout-27-item',
                ]
            );

            $this->add_group_control(
                \Elementor\Group_Control_Box_Shadow::get_type(),
                [
                    'name'      => 'item_box_shadow',
                    'label'     => esc_html__( 'Box Shadow', 'fancy-post-grid' ),
                    'selector'  => '{{WRAPPER}} .fpg-section-area .rs-blog__single, {{WRAPPER}} .rs-blog-layout-1 .blog-item, {{WRAPPER}} .rs-blog-layout-30-item,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item,{{WRAPPER}} .rs-blog__left-blog,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap,{{WRAPPER}} .rs-blog-layout-17-item,{{WRAPPER}} .rs-blog-layout-20-item,{{WRAPPER}} .rs-blog-layout-22-item,{{WRAPPER}} .rs-blog-layout-24-item,{{WRAPPER}} .rs-blog-layout-25-item,{{WRAPPER}} .rs-blog-layout-27-list-item,{{WRAPPER}} .rs-blog-layout-27-item',
                    'render_type' => 'template'
                ]
            );

            $this->end_controls_tab();

            // Hover Tab
            $this->start_controls_tab(
                'card_hover_tab',
                [
                    'label' => esc_html__( 'Hover', 'fancy-post-grid' ),
                ]
            );

            $this->add_control(
                'item_card_background_hover',
                [
                    'label'     => esc_html__( 'Background Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .fpg-section-area .rs-blog__single:hover,{{WRAPPER}} .rs-blog-layout-26 .rs-blog-layout-26-item:hover .rs-content, {{WRAPPER}} .rs-blog-layout-1 .blog-item:hover, {{WRAPPER}} .rs-blog-layout-30-item:hover, {{WRAPPER}} .rs-blog-layout-28-item:hover,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item:hover,{{WRAPPER}} .rs-blog__left-blog:hover,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap:hover,{{WRAPPER}} .rs-blog-layout-17-item:hover,{{WRAPPER}} .rs-blog-layout-20-item:hover,{{WRAPPER}} .rs-blog-layout-22-item:hover,{{WRAPPER}} .rs-blog-layout-24-item:hover,{{WRAPPER}} .rs-blog-layout-25-item:hover,{{WRAPPER}} .rs-blog-layout-27-list-item:hover,{{WRAPPER}} .rs-blog-layout-27-item:hover' => 'background-color: {{VALUE}};',
                    ],
                ]
            );
            $this->add_group_control(
                \Elementor\Group_Control_Border::get_type(),
                [
                    'name' => 'item_border_color_hover',
                    'selector' => '{{WRAPPER}} .fpg-section-area .rs-blog__single:hover, {{WRAPPER}} .rs-blog-layout-1 .blog-item:hover,{{WRAPPER}} .rs-blog-layout-30-item:hover,{{WRAPPER}} .rs-blog-layout-28-item:hover,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item:hover,{{WRAPPER}} .rs-blog__left-blog:hover,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap:hover,{{WRAPPER}} .rs-blog-layout-17-item:hover,{{WRAPPER}} .rs-blog-layout-20-item:hover,{{WRAPPER}} .rs-blog-layout-22-item:hover,{{WRAPPER}} .rs-blog-layout-24-item:hover,{{WRAPPER}} .rs-blog-layout-25-item:hover,{{WRAPPER}} .rs-blog-layout-27-list-item:hover,{{WRAPPER}} .rs-blog-layout-27-item:hover',
                    'render_type' => 'template'
                ]
            );

            $this->add_group_control(
                \Elementor\Group_Control_Box_Shadow::get_type(),
                [
                    'name'      => 'item_box_shadow_hover',
                    'label'     => esc_html__( 'Box Shadow', 'fancy-post-grid' ),
                    'selector'  => '{{WRAPPER}} .fpg-section-area .rs-blog__single:hover, {{WRAPPER}} .rs-blog-layout-1 .blog-item:hover,{{WRAPPER}} .rs-blog-layout-30-item:hover,{{WRAPPER}} .rs-blog-layout-28-item:hover,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item:hover,{{WRAPPER}} .rs-blog__left-blog:hover,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap:hover,{{WRAPPER}} .rs-blog-layout-17-item:hover,{{WRAPPER}} .rs-blog-layout-20-item:hover,{{WRAPPER}} .rs-blog-layout-22-item:hover,{{WRAPPER}} .rs-blog-layout-24-item:hover,{{WRAPPER}} .rs-blog-layout-25-item:hover,{{WRAPPER}} .rs-blog-layout-27-list-item:hover,{{WRAPPER}} .rs-blog-layout-27-item:hover',
                    'render_type' => 'template'
                ]
            );

            $this->end_controls_tab();

            $this->end_controls_tabs();

            $this->end_controls_section();

            // Style Section
            $this->start_controls_section(
                'post_content_box',
                [
                    'label' => esc_html__( 'Content Box', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
                ]
            );

            // Content Styling: Background
            $this->add_group_control(
                \Elementor\Group_Control_Background::get_type(),
                [
                    'name' => 'card_background_content',
                    'types' => [ 'classic', 'gradient' ],
                    'selector' => '{{WRAPPER}} .fpg-section-area .rs-blog__single .rs-content,{{WRAPPER}} .rs-blog-layout-1 .blog-item .blog-content,{{WRAPPER}} .rs-blog-layout-30-item .rs-content,{{WRAPPER}} .rs-content,{{WRAPPER}} .rs-blog__single .content,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content,{{WRAPPER}} .pre-blog-item.style_12:hover .blog-inner-wrap .pre-blog-content,{{WRAPPER}} .rs-blog__content,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap .blog-content',
                ]
            );

            // Title Styling: margin
            $this->add_responsive_control(
                'content_margin',
                [
                    'label'      => esc_html__( 'Margin', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', 'em', '%' ),
                    'selectors'  => array(
                        '{{WRAPPER}} .fpg-section-area .rs-blog__single .rs-content,{{WRAPPER}} .rs-blog-layout-1 .blog-item .blog-content,{{WRAPPER}} .rs-blog-layout-30-item .rs-content,{{WRAPPER}} .rs-content,{{WRAPPER}} .rs-blog__single .content,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content,{{WRAPPER}} .rs-blog__content,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap .blog-content' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                    'render_type' => 'template'
                ]
            );  
            // Title Styling: padding
            $this->add_responsive_control(
                'content_padding',
                [
                    'label'      => esc_html__( 'Padding', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', '%' ),
                    'selectors'  => array(
                        '{{WRAPPER}} .fpg-section-area .rs-blog__single .rs-content,{{WRAPPER}} .rs-blog-layout-1 .blog-item .blog-content,{{WRAPPER}} .rs-blog-layout-30-item .rs-content,{{WRAPPER}} .rs-content,{{WRAPPER}} .rs-blog__single .content,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content,{{WRAPPER}} .rs-blog__content,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap .blog-content' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                    'render_type' => 'template'
                ]
            );  
            $this->add_group_control(
                \Elementor\Group_Control_Border::get_type(),
                [
                    'name' => 'content_border_color',
                    'selector' => '{{WRAPPER}} .fpg-section-area .rs-blog__single .rs-content,{{WRAPPER}} .rs-blog-layout-1 .blog-item .blog-content,{{WRAPPER}} .rs-blog-layout-30-item .rs-content,{{WRAPPER}} .rs-content,{{WRAPPER}} .rs-blog__single .content,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content,{{WRAPPER}} .rs-blog__content,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap .blog-content',
                ]
            );
            // Card Border Radius
            $this->add_responsive_control(
                'card_content_border_radius',
                [
                    'label'      => esc_html__( 'Border Radius', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', 'em', '%' ),
                    'selectors'  => array(
                        '{{WRAPPER}} .fpg-section-area .rs-blog__single .rs-content,{{WRAPPER}} .rs-blog-layout-1 .blog-item .blog-content,{{WRAPPER}} .rs-blog-layout-30-item .rs-content,{{WRAPPER}} .rs-content,{{WRAPPER}} .rs-blog__single .content,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content,{{WRAPPER}} .rs-blog__content,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap .blog-content' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                ]
            );

            $this->end_controls_section();

            // Thumbnail Style Section
            $this->start_controls_section(
                'thumbnail_style',
                [
                    'label' => esc_html__( 'Thumbnail', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
                ]
            );

            // Thumbnail Styling: Image Width
            $this->add_responsive_control(
                'thumbnail_width',
                [
                    'label'      => esc_html__( 'Image Width', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::SLIDER,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'range'      => [
                        'px' => [
                            'min' => 10,
                            'max' => 2000,
                            'step' => 1,
                        ],
                        '%' => [
                            'min' => 10,
                            'max' => 100,
                            'step' => 1,
                        ],
                        'vw' => [
                            'min' => 1,
                            'max' => 100,
                            'step' => 0.1,
                        ],
                    ],
                    'selectors'  => [
                        '{{WRAPPER}} .rs-thumb img' => 'width: {{SIZE}}{{UNIT}};',
                    ],
                ]
            );
            // Wrapper Thumbnail Styling: Wrapper Width
            $this->add_responsive_control(
                'thumbnail_Wrapper_width',
                [
                    'label'      => esc_html__( 'Wrapper Width', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::SLIDER,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'range'      => [
                        'px' => [
                            'min' => 10,
                            'max' => 2000,
                            'step' => 1,
                        ],
                        '%' => [
                            'min' => 10,
                            'max' => 100,
                            'step' => 1,
                        ],
                        'vw' => [
                            'min' => 1,
                            'max' => 100,
                            'step' => 0.1,
                        ],
                    ],
                    'selectors'  => [
                        '{{WRAPPER}} .rs-thumb' => 'width: {{SIZE}}{{UNIT}};',
                    ],
                ]
            );
            // Wrapper Thumbnail Styling: Wrapper Width
            $this->add_responsive_control(
                'thumbnail_Wrapper_height',
                [
                    'label'      => esc_html__( 'Wrapper Height', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::SLIDER,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'range'      => [
                        'px' => [
                            'min' => 10,
                            'max' => 2000,
                            'step' => 1,
                        ],
                        '%' => [
                            'min' => 10,
                            'max' => 100,
                            'step' => 1,
                        ],
                        'vw' => [
                            'min' => 1,
                            'max' => 100,
                            'step' => 0.1,
                        ],
                    ],
                    'selectors'  => [
                        '{{WRAPPER}} .rs-thumb' => 'height: {{SIZE}}{{UNIT}};',
                    ],
                ]
            );
            // Thumbnail Styling: Padding
            $this->add_responsive_control(
                'thumbnail_padding',
                [
                    'label'      => esc_html__( 'Padding', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', 'em', '%' ),
                    'selectors'  => array(
                        '{{WRAPPER}} .rs-thumb' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                ]
            );
            // Thumbnail Styling: Margin
            $this->add_responsive_control(
                'thumbnail_margin',
                [
                    'label'      => esc_html__( 'Margin', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', 'em', '%' ),
                    'selectors'  => array(
                        '{{WRAPPER}} .rs-thumb' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                ]
            );

            // Thumbnail Styling: Border Radius
            $this->add_responsive_control(
                'thumbnail_border_radius',
                [
                    'label'      => esc_html__( 'Border Radius', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', 'em', '%' ),
                    'selectors'  => array(
                        '{{WRAPPER}} .rs-thumb' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                ]
            );
            $this->add_group_control(
                \Elementor\Group_Control_Border::get_type(),
                [
                    'name' => 'thumb_border_color',
                    'selector' => '{{WRAPPER}} .rs-thumb',
                ]
            );

            $this->add_group_control(
                \Elementor\Group_Control_Box_Shadow::get_type(),
                [
                    'name'      => 'thumb_box_shadow',
                    'label'     => esc_html__( 'Box Shadow', 'fancy-post-grid' ),
                    'selector'  => '{{WRAPPER}} .rs-thumb',
                ]
            );

            $this->end_controls_section();

            // Style Section
            $this->start_controls_section(
                'post_title_style',
                [
                    'label' => esc_html__( 'Post Title', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
                ]
            );

            // Title Styling: Typography
            $this->add_group_control(
                \Elementor\Group_Control_Typography::get_type(),
                [
                    'name'     => 'title_typography',
                    'label'    => esc_html__( 'Typography', 'fancy-post-grid' ),
                    'selector' => '{{WRAPPER}} .fancy-post-title a, {{WRAPPER}} .fancy-post-title, {{WRAPPER}} .rs-blog-layout-27-list-item .rs-content .title a',

                ]
            );

            // Title Styling: Alignment
            $this->add_responsive_control(
                'title_alignment',
                [
                    'label'     => esc_html__( 'Alignment', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::CHOOSE,
                    'options'   => array(
                        'left'   => array(
                            'title' => esc_html__( 'Left', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-left',
                        ),
                        'center' => array(
                            'title' => esc_html__( 'Center', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-center',
                        ),
                        'right'  => array(
                            'title' => esc_html__( 'Right', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-right',
                        ),
                        'justify' => array(
                            'title' => esc_html__( 'Justify', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-justify',
                        ),
                    ),
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-title,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-content .title a' => 'text-align: {{VALUE}};',
                    ),
                ]
            );           

            // Title Styling: Padding
            $this->add_responsive_control(
                'title_padding',
                [
                    'label'      => esc_html__( 'Padding', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', 'em', '%' ),
                    'selectors'  => array(
                        '{{WRAPPER}} .fancy-post-title,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-content .title a' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                ]
            );

            // Title Styling: margin
            $this->add_responsive_control(
                'title_margin',
                [
                    'label'      => esc_html__( 'Margin', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', 'em', '%' ),
                    'selectors'  => array(
                        '{{WRAPPER}} .fancy-post-title,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-content .title a' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                ]
            ); 

            // Title Styling: Tabs (Normal, Hover, Box Hover)
            $this->start_controls_tabs('title_style_tabs');

            // Normal Tab
            $this->start_controls_tab(
                'title_normal',
                [
                    'label' => esc_html__( 'Normal', 'fancy-post-grid' ),
                ]
            );

            $this->add_control(
                'title_normal_color',
                [
                    'label'     => esc_html__( 'Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-title a,{{WRAPPER}} .blog-title a,{{WRAPPER}} .rs-blog-layout-1.rs-blog-layout-9 .blog-horizontal .blog-meta .blog-item-wrap .blog-content .blog-title a,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-content .title a' => 'color: {{VALUE}};',
                        '{{WRAPPER}} .fancy-post-title' => 'color: {{VALUE}};',

                    ),
                ]
            );

            $this->add_control(
                'title_normal_background',
                [
                    'label'     => esc_html__( 'Background Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-title,{{WRAPPER}} .rs-blog-layout-3 .rs-blog__single .content .title a,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-content .title' => 'background-color: {{VALUE}};',
                    ),
                ]
            );
            

            $this->end_controls_tab();

            // Hover Tab
            $this->start_controls_tab(
                'title_hover',
                [
                    'label' => esc_html__( 'Hover', 'fancy-post-grid' ),
                ]
            );

            $this->add_control(
                'title_hover_color',
                [
                    'label'     => esc_html__( 'Hover Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-title a:hover' => 'color: {{VALUE}};',
                        '{{WRAPPER}} .fancy-post-title:hover,{{WRAPPER}} .rs-blog-layout-1.rs-blog-layout-9 .blog-horizontal .blog-meta .blog-item-wrap .blog-content .blog-title a:hover,{{WRAPPER}} .rs-blog-layout-17-item .rs-content .title a:hover,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-content .title a:hover' => 'color: {{VALUE}};',
                        '{{WRAPPER}} .underline a' => 'background-image: linear-gradient(to bottom, {{VALUE}} 0%, {{VALUE}} 100%) !important;',
                    ),
                ]
            );

            $this->add_control(
                'title_hover_background',
                [
                    'label'     => esc_html__( 'Hover Background Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-title:hover,{{WRAPPER}} .rs-blog-layout-3 .rs-blog__single .content .title a:hover,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-content .title:hover' => 'background-color: {{VALUE}};',
                    ),
                    'render_type' => 'template'
                ]
            );
            
            $this->end_controls_tab();

            $this->end_controls_tabs(); // End Title Tabs

            $this->end_controls_section(); // End Post Title Style Section

            // Excerpt/Content Style
            $this->start_controls_section(
                'excerpt_content_style',
                [
                    'label' => esc_html__( 'Excerpt', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
                ]
            );

            // Typography Control
            $this->add_group_control(
                \Elementor\Group_Control_Typography::get_type(),
                [
                    'name'     => 'excerpt_typography',
                    'label'    => esc_html__( 'Typography', 'fancy-post-grid' ),
                    'selector' => '{{WRAPPER}} .fancy-post-excerpt',
                ]
            );

            // Excerpt Padding Control
            $this->add_responsive_control(
                'excerpt_padding',
                [
                    'label'      => esc_html__( 'Padding', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', 'em', '%' ),
                    'selectors'  => array(
                        '{{WRAPPER}} .fancy-post-excerpt' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                ]
            );

            // Excerpt Margin Control
            $this->add_responsive_control(
                'excerpt_margin',
                [
                    'label'      => esc_html__( 'Margin', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', 'em', '%' ),
                    'selectors'  => array(
                        '{{WRAPPER}} .fancy-post-excerpt' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}} !important;',
                    ),
                ]
            );

            // Excerpt Alignment Control  
            $this->add_responsive_control(
                'excerpt_alignment',
                [
                    'label'     => esc_html__( 'Alignment', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::CHOOSE,
                    'options'   => array(
                        'left'   => array(
                            'title' => esc_html__( 'Left', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-left',
                        ),
                        'center' => array(
                            'title' => esc_html__( 'Center', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-center',
                        ),
                        'right'  => array(
                            'title' => esc_html__( 'Right', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-right',
                        ),
                        'justify' => array(
                            'title' => esc_html__( 'Justify', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-justify',
                        ),
                    ),
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-excerpt' => 'text-align: {{VALUE}};',
                    ),
                ]
            );

            // Tabs for Normal and Box Hover
            $this->start_controls_tabs('excerpt_color_tabs');

            // Normal Tab
            $this->start_controls_tab(
                'excerpt_normal_tab',
                [
                    'label' => esc_html__( 'Normal', 'fancy-post-grid' ),
                ]
            );

            // Excerpt Color Control (Normal)
            $this->add_control(
                'excerpt_normal_color',
                [
                    'label'     => esc_html__( 'Excerpt Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-excerpt' => 'color: {{VALUE}} !important;',
                    ),
                    'render_type' => 'template',
                ]
            );

            $this->add_control(
                'excerpt_normal_background',
                [
                    'label'     => esc_html__( 'Background Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-excerpt' => 'background-color: {{VALUE}};',
                    ),
                ]
            );
            
            $this->end_controls_tab();

            // Box Hover Tab
            $this->start_controls_tab(
                'excerpt_hover_tab',
                [
                    'label' => esc_html__( 'Hover', 'fancy-post-grid' ),
                ]
            );

            // Excerpt Color on Hover Control
            $this->add_control(
                'excerpt_hover_color',
                [
                    'label'     => esc_html__( 'Excerpt Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-excerpt:hover' => 'color: {{VALUE}} !important;',
                    ),
                ]
            );
            // Excerpt Color Control (Normal)
            $this->add_control(
                'excerpt_hover_background',
                [
                    'label'     => esc_html__( 'Background Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-excerpt:hover' => 'background-color: {{VALUE}} ;',
                    ),
                ]
            );  
                     
            $this->end_controls_tab();
            $this->end_controls_tabs();

            $this->end_controls_section();

            // Meta Data Style
            $this->start_controls_section(
                'meta_data_style',
                [
                    'label' => esc_html__( 'Meta Data', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
                ]
            );

            // Meta Data Typography
            $this->add_group_control(
                \Elementor\Group_Control_Typography::get_type(),
                [
                    'name'     => 'meta_typography',
                    'label'    => esc_html__( 'Typography', 'fancy-post-grid' ),
                    'selector' => '{{WRAPPER}} .meta-data-list li,{{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-blog-content ul li, {{WRAPPER}} .meta-date span, {{WRAPPER}} .rs-blog-layout-14-item .rs-content .rs-meta div, {{WRAPPER}} .rs-blog-layout-15-item .rs-content .rs-meta, {{WRAPPER}} .rs-blog-layout-16-item .rs-content .rs-meta, {{WRAPPER}} .rs-blog-layout-26-item .rs-content .rs-meta .rs-meta-all, {{WRAPPER}} .rs-blog-layout-26-item .rs-content .rs-meta .rs-meta-all .meta-categories a, {{WRAPPER}} .rs-blog-layout-1 .blog-item .blog-content .blog-meta li a, .rs-blog-layout-1 .blog-item .blog-content .blog-meta li, .rs-blog-layout-1 .blog-item-wrap .blog-content .blog-meta li a,{{WRAPPER}} .rs-blog-layout-26-item .rs-content .rs-meta .meta-category a,{{WRAPPER}} .rs-blog-layout-13-item .rs-thumb .pre-blog-meta .pre-date, {{WRAPPER}} .rs-blog-layout-13-item .rs-thumb .pre-blog-meta .pre-month, {{WRAPPER}} .rs-blog-layout-8 .rs-blog__thumb .rs-category a, {{WRAPPER}} .rs-blog-layout-8 .rs-blog__thumb .rs-category i, {{WRAPPER}} .rs-blog-layout-1.rs-blog-layout-9 .blog-horizontal .blog-meta .blog-item-wrap .blog-content .blog-meta .meta-date,{{WRAPPER}} .rs-blog-layout-1.rs-blog-layout-9 .blog-horizontal .blog-meta .blog-item-wrap .blog-content .blog-meta .admin,{{WRAPPER}} .rs-blog-layout-15-item .rs-thumb .rs-category,{{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-image-wrap .pre-blog-meta .pre-month,{{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-image-wrap .pre-blog-meta .pre-date,{{WRAPPER}} .rs-blog-layout-14-item .rs-content .rs-meta a,{{WRAPPER}} .rs-blog-layout-14-item .rs-content .rs-meta .meta-date,{{WRAPPER}} .blog-item .blog-content .blog-meta li a,{{WRAPPER}} .rs-blog-layout-3 .rs-blog__single .content .rs-blog-category a,{{WRAPPER}} .rs-blog-layout-3 .rs-blog__single .content ul li,{{WRAPPER}} .rs-blog-layout-3 .rs-blog__single .content .rs-blog-author .user a span,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-category a,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-blog-footer .user span,{{WRAPPER}} .rs-blog-layout-25-item .rs-content .rs-cat a,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-content .rs-meta-category a,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-content .rs-meta-category i,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-date .title,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-date span',

                ]
            );
            // Meta Data separator Typography
            $this->add_group_control(
                \Elementor\Group_Control_Typography::get_type(),
                [
                    'name'     => 'meta_separator_typography',
                    'label'    => esc_html__( 'Separator Typography', 'fancy-post-grid' ),
                    'selector' => '{{WRAPPER}} .meta-data-list span,{{WRAPPER}} .rs-blog-layout-1 .blog-item-wrap .blog-content .blog-meta span',
                ]
            );

            // Meta Data Alignment
            $this->add_responsive_control(
                'meta_alignment',
                [
                    'label'     => esc_html__( 'Alignment', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::CHOOSE,
                    'options'   => array(
                        'flex-Start'   => array(
                            'title' => esc_html__( 'Left', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-left',
                        ),
                        'center' => array(
                            'title' => esc_html__( 'Center', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-center',
                        ),
                        'flex-end'  => array(
                            'title' => esc_html__( 'Right', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-right',
                        ),
                    ),
                    'selectors' => array(
                        '{{WRAPPER}} .meta-data-list,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-category' => 'justify-content: {{VALUE}};',
                    ),
                ]
            );

            // Meta Data Margin
            $this->add_responsive_control(
                'meta_margin',
                [
                    'label'      => esc_html__( 'Margin', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', 'em', '%' ),
                    'selectors'  => array(
                        '{{WRAPPER}} .meta-data-list,{{WRAPPER}} .rs-thumb .meta-date span,{{WRAPPER}} .rs-content .rs-meta' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                ]
            );
            // Meta Data Margin
            $this->add_responsive_control(
                'meta_padding',
                [
                    'label'      => esc_html__( 'padding', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', 'em', '%' ),
                    'selectors'  => array(
                        '{{WRAPPER}} .meta-data-list,{{WRAPPER}} .rs-thumb .meta-date span,{{WRAPPER}} .rs-content .rs-meta a,{{WRAPPER}} .rs-blog__item .rs-content .rs-category a,{{WRAPPER}} .rs-blog__single .content .rs-blog-category a,{{WRAPPER}} .rs-content .rs-meta .meta-date,{{WRAPPER}} .rs-content .rs-meta .meta-category a' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                ]
            );

            // Meta Color Tabs
            $this->start_controls_tabs('meta_color_tabs');

            // Normal Tab
            $this->start_controls_tab(
                'meta_normal_tab',
                [
                    'label' => esc_html__( 'Normal', 'fancy-post-grid' ),
                ]
            );

            $this->add_control(
                'meta_color',
                [
                    'label'     => esc_html__( 'Meta Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .meta-data-list li,{{WRAPPER}} .meta-data-list li a,{{WRAPPER}} .meta-data-list,{{WRAPPER}} .rs-blog-layout-26-item .rs-content .rs-meta .meta-date span,{{WRAPPER}} .rs-blog-layout-26-item .rs-content .rs-meta .meta-category a,{{WRAPPER}} .rs-blog-layout-13-item .rs-thumb .pre-blog-meta .pre-date, {{WRAPPER}} .rs-blog-layout-13-item .rs-thumb .pre-blog-meta .pre-month,{{WRAPPER}} .rs-blog-layout-8 .rs-blog__thumb .rs-category a,{{WRAPPER}} .rs-blog-layout-1.rs-blog-layout-9 .blog-horizontal .blog-meta .blog-item-wrap .blog-content .blog-meta .admin,{{WRAPPER}} .rs-blog-layout-1.rs-blog-layout-9 .blog-horizontal .blog-meta .blog-item-wrap .blog-content .blog-meta .meta-date,{{WRAPPER}} .rs-blog-layout-14-item .rs-content .rs-meta a,{{WRAPPER}} .rs-blog-layout-15-item .rs-thumb .rs-category a,{{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-image-wrap .pre-blog-meta .pre-month,{{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-image-wrap .pre-blog-meta .pre-date,{{WRAPPER}} .rs-blog-layout-14-item .rs-content .rs-meta .meta-date,{{WRAPPER}} .rs-blog-layout-3 .rs-blog__single .content .rs-blog-category a,{{WRAPPER}} .rs-blog-layout-3 .rs-blog__single .content ul li,{{WRAPPER}} .rs-blog-layout-3 .rs-blog__single .content .rs-blog-author .user a span,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-category a,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-blog-footer .user span,{{WRAPPER}} .rs-blog-layout-30-item .rs-thumb .meta-date span,{{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-blog-content ul li,{{WRAPPER}} .rs-blog-layout-25-item .rs-content .rs-cat a,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-content .rs-meta-category a,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-content .rs-meta-category i,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-date .title,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-date span' => 'color: {{VALUE}};',
                        '{{WRAPPER}} .rs-blog-layout-25-item .rs-content .rs-cat a' => '    border-bottom-color: {{VALUE}};',
                    ),
                ]
            );
            $this->add_control(
                'meta_background_color',
                [
                    'label'     => esc_html__( 'Meta Background Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .rs-blog-layout-13-item .rs-thumb .pre-blog-meta,{{WRAPPER}} .rs-blog-layout-8 .rs-blog__thumb .rs-category,{{WRAPPER}} .rs-blog-layout-28-item .rs-thumb .rs-meta,{{WRAPPER}} .rs-blog-layout-30-item .rs-thumb .meta-date span,{{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-image-wrap .pre-blog-meta,{{WRAPPER}} .rs-blog-layout-14-item .rs-content .rs-meta a,{{WRAPPER}} .rs-blog-layout-15-item .rs-thumb .rs-category,{{WRAPPER}} .rs-blog-layout-3 .rs-blog__single .content .rs-blog-category a,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-category a,{{WRAPPER}} .rs-blog-layout-18 .rs-blog-layout-18-item .rs-content .rs-meta,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-date' => 'background: {{VALUE}};',
                        '{{WRAPPER}} .rs-blog-layout-13-item .rs-thumb .pre-blog-meta::after,{{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-image-wrap .pre-blog-meta::after' => 'border-color: {{VALUE}};',
                    ),
                ]
            );
            $this->add_control(
                'meta_separator_color',
                [
                    'label'     => esc_html__( 'Meta Separator Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .meta-data-list span' => 'color: {{VALUE}};',
                    ),
                ]
            );

            $this->add_control(
                'meta_icon_color',
                [
                    'label'     => esc_html__( 'Icon Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .meta-data-list i,{{WRAPPER}} .rs-blog-layout-8 .rs-blog__thumb .rs-category i,{{WRAPPER}} .rs-blog-layout-1.rs-blog-layout-9 .blog-horizontal .blog-meta .blog-item-wrap .blog-content .blog-meta .admin i,{{WRAPPER}} .rs-blog-layout-1.rs-blog-layout-9 .blog-horizontal .blog-meta .blog-item-wrap .blog-content .blog-meta .meta-date i,{{WRAPPER}} .rs-blog-layout-3 .rs-blog__single .content .rs-blog-category i,{{WRAPPER}} .rs-blog-layout-3 .rs-blog__single .content ul li i,{{WRAPPER}} .rs-blog-layout-30-item .rs-thumb .meta-date span i,{{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-blog-content ul li i,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-content .rs-meta-category i' => 'color: {{VALUE}};',
                    ),
                ]
            );

            $this->end_controls_tab();

            // Hover Tab
            $this->start_controls_tab(
                'meta_hover_tab',
                [
                    'label' => esc_html__( 'Hover', 'fancy-post-grid' ),
                ]
            );

            $this->add_control(
                'meta_link_hover_color',
                [
                    'label'     => esc_html__( 'Link Hover Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .meta-data-list a:hover,{{WRAPPER}} .blog-item .blog-content .blog-meta li a:hover,{{WRAPPER}} .rs-blog-layout-3 .rs-blog__single .content .rs-blog-category a:hover,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-blog-footer .user span:hover,{{WRAPPER}} .rs-blog__item .rs-content .rs-category a:hover,{{WRAPPER}} .rs-blog-layout-26-item .rs-content .rs-meta .meta-category a:hover,{{WRAPPER}} .rs-blog-layout-25-item .rs-content .rs-cat a:hover,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-content .rs-meta-category a:hover' => 'color: {{VALUE}};',
                    ),
                ]
            );

            $this->end_controls_tab();

            $this->end_controls_tabs();

            $this->end_controls_section();


            // Button Style
            $this->start_controls_section(
                'read_more_style',
                [
                    'label' => esc_html__( 'Button', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
                ]
            );

            // Typography
            $this->add_group_control(
                \Elementor\Group_Control_Typography::get_type(),
                [
                    'name'     => 'readmore_typography',
                    'label'    => esc_html__( 'Typography', 'fancy-post-grid' ),
                    'selector' => '{{WRAPPER}} .fpg-section-area a.read-more, {{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-blog-content .blog-btn-part .blog-btn, {{WRAPPER}} .blog-item .blog-content .blog-btn .read-more, {{WRAPPER}} .rs-blog__single .content .rs-blog-author .rs-link a, {{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-blog-footer .btn-link, {{WRAPPER}} .rs-blog__item .rs-content .rs-blog-footer .blog-btn .rs-btn',
                ]
            );

            // Button Space
            $this->add_responsive_control(
                'readmore_button_margin',
                [
                    'label'     => esc_html__( 'margin', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', 'em', '%' ),
                    'selectors' => array(
                        '{{WRAPPER}} .fpg-section-area a.read-more, {{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-blog-content .blog-btn-part .blog-btn, {{WRAPPER}} .blog-item .blog-content .blog-btn .read-more, {{WRAPPER}} .rs-blog__single .content .rs-blog-author .rs-link a, {{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-blog-footer .btn-link, {{WRAPPER}} .rs-blog__item .rs-content .rs-blog-footer .blog-btn .rs-btn' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                ]
            );

            // Button Padding
            $this->add_responsive_control(
                'readmore_button_padding',
                [
                    'label'     => esc_html__( 'Padding', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', 'em', '%' ),
                    'selectors' => array(
                        '{{WRAPPER}} .fpg-section-area a.read-more, {{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-blog-content .blog-btn-part .blog-btn, {{WRAPPER}} .blog-item .blog-content .blog-btn .read-more, {{WRAPPER}} .rs-blog__single .content .rs-blog-author .rs-link a, {{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-blog-footer .btn-link, {{WRAPPER}} .rs-blog__item .rs-content .rs-blog-footer .blog-btn .rs-btn' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                ]
            );

            // Button Alignment
            $this->add_responsive_control(
                'readmore_button_alignment',
                [
                    'label'        => esc_html__( 'Alignment', 'fancy-post-grid' ),
                    'type'         => \Elementor\Controls_Manager::CHOOSE,
                    'options'      => array(
                        'left'   => array(
                            'title' => esc_html__( 'Left', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-left',
                        ),
                        'center' => array(
                            'title' => esc_html__( 'Center', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-center',
                        ),
                        'right'  => array(
                            'title' => esc_html__( 'Right', 'fancy-post-grid' ),
                            'icon'  => 'eicon-text-align-right',
                        ),
                    ),
                    'selectors'    => array(
                        '{{WRAPPER}} .fpg-section-area .btn-wrapper,{{WRAPPER}} .rs-blog-layout-18-item .rs-content .blgo-btn-box' => 'text-align: {{VALUE}};',
                    ),
                ]
            );

            // Start Tabs for Normal, Hover, and Box Hover
            $this->start_controls_tabs('readmore_style_tabs');

            // Normal Tab
            $this->start_controls_tab(
                'readmore_normal_tab',
                [
                    'label' => esc_html__( 'Normal', 'fancy-post-grid' ),
                ]
            );

            $this->add_control(
                'readmore_normal_text_color',
                [
                    'label'     => esc_html__( 'Text Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    
                    'selectors' => array(
                        '{{WRAPPER}} .fpg-section-area a.read-more,{{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-blog-content .blog-btn-part .blog-btn, {{WRAPPER}}  .blog-item .blog-content .blog-btn .read-more, {{WRAPPER}} .rs-blog__single .content .rs-blog-author .rs-link a, {{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-blog-footer .btn-link, {{WRAPPER}} .rs-blog-layout-4.rs-blog-layout-10 .rs-grid .rs-grid-item .rs-blog__item .rs-content .rs-blog-footer .blog-btn .rs-btn' => 'color: {{VALUE}};',
                    ),
                ]
            );

            $this->add_control(
                'readmore_normal_background_color',
                [
                    'label'     => esc_html__( 'Background Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fpg-section-area a.read-more,{{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-blog-content .blog-btn-part .blog-btn, {{WRAPPER}}  .blog-item .blog-content .blog-btn .read-more, {{WRAPPER}} .rs-blog__single .content .rs-blog-author .rs-link a, {{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-blog-footer .btn-link, {{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-blog-footer .btn-link, {{WRAPPER}} .rs-blog__item .rs-content .rs-blog-footer .blog-btn .rs-btn' => 'background: {{VALUE}};',
                    ),
                ]
            );

            $this->add_group_control(
                \Elementor\Group_Control_Border::get_type(),
                [
                    'name'     => 'readmore_normal_border',
                    'label'    => esc_html__( 'Border', 'fancy-post-grid' ),
                    'selector' => '{{WRAPPER}} .fpg-section-area a.read-more, {{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-blog-content .blog-btn-part .blog-btn, {{WRAPPER}} .blog-item .blog-content .blog-btn .read-more, {{WRAPPER}} .rs-blog__single .content .rs-blog-author .rs-link a, {{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-blog-footer .btn-link, {{WRAPPER}} .rs-blog__item .rs-content .rs-blog-footer .blog-btn .rs-btn',
                ]
            );

            $this->add_responsive_control(
                'readmore_normal_border_radius',
                [
                    'label'      => esc_html__( 'Border Radius', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', '%' ),
                    'selectors'  => array(
                        '{{WRAPPER}} .fpg-section-area a.read-more, {{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-blog-content .blog-btn-part .blog-btn, {{WRAPPER}} .blog-item .blog-content .blog-btn .read-more, {{WRAPPER}} .rs-blog__single .content .rs-blog-author .rs-link a, {{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-blog-footer .btn-link, {{WRAPPER}} .rs-blog__item .rs-content .rs-blog-footer .blog-btn .rs-btn' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                ]
            );

            $this->end_controls_tab();

            // Hover Tab
            $this->start_controls_tab(
                'readmore_hover_tab',
                [
                    'label' => esc_html__( 'Hover', 'fancy-post-grid' ),
                ]
            );

            $this->add_control(
                'readmore_hover_text_color',
                [
                    'label'     => esc_html__( 'Text Color on Hover', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fpg-section-area a.read-more:hover, {{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-blog-content .blog-btn-part .blog-btn:hover, {{WRAPPER}} .blog-item .blog-content .blog-btn .read-more:hover, {{WRAPPER}} .rs-blog__single .content .rs-blog-author .rs-link a:hover, {{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-blog-footer .btn-link:hover, {{WRAPPER}} .rs-blog-layout-4.rs-blog-layout-10 .rs-grid .rs-grid-item .rs-blog__item .rs-content .rs-blog-footer .blog-btn .rs-btn:hover' => 'color: {{VALUE}};',
                        '{{WRAPPER}} .fpg-border::before' => 'background: {{VALUE}};',
                    ),
                ]
            );

            $this->add_control(
                'readmore_hover_background_color',
                [
                    'label'     => esc_html__( 'Background Color on Hover', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fpg-section-area a.read-more:hover,{{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-blog-content .blog-btn-part .blog-btn:hover, {{WRAPPER}} .blog-item .blog-content .blog-btn .read-more:hover, {{WRAPPER}} .rs-blog__single .content .rs-blog-author .rs-link a:hover, {{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-blog-footer .btn-link:hover, {{WRAPPER}} .rs-blog__item .rs-content .rs-blog-footer .blog-btn .rs-btn:hover' => 'background-color: {{VALUE}};',
                    ),
                ]
            );

            $this->add_group_control(
                \Elementor\Group_Control_Border::get_type(),
                [
                    'name'     => 'readmore_hover_border',
                    'label'    => esc_html__( 'Border', 'fancy-post-grid' ),
                    'selector' => '{{WRAPPER}} .fpg-section-area a.read-more:hover,{{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-blog-content .blog-btn-part .blog-btn:hover, {{WRAPPER}} .blog-item .blog-content .blog-btn .read-more:hover, {{WRAPPER}} .rs-blog__single .content .rs-blog-author .rs-link a:hover, {{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-blog-footer .btn-link:hover, {{WRAPPER}} .rs-blog__item .rs-content .rs-blog-footer .blog-btn .rs-btn:hover',
                ]
            );

            $this->add_responsive_control(
                'readmore_hover_border_radius',
                [
                    'label'      => esc_html__( 'Border Radius on Hover', 'fancy-post-grid' ),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'size_units' => array( 'px', '%' ),
                    'selectors'  => array(
                        '{{WRAPPER}} .fpg-section-area a.read-more:hover,{{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-blog-content .blog-btn-part .blog-btn:hover, {{WRAPPER}} .blog-item .blog-content .blog-btn .read-more:hover, {{WRAPPER}} .rs-blog__single .content .rs-blog-author .rs-link a:hover, {{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-blog-footer .btn-link:hover, {{WRAPPER}} .rs-blog__item .rs-content .rs-blog-footer .blog-btn .rs-btn:hover' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ),
                ]
            );

            $this->end_controls_tab();

            $this->end_controls_tabs();

            $this->end_controls_section();

            // Isotope Style Section
            if (!in_array('isotope_style', $this->exclude_controls)) {
                $this->start_controls_section(
                    'isotope_style',
                    [
                        'label' => esc_html__('Filter Box', 'fancy-post-grid'),
                        'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
                    ]
                );
                $this->add_responsive_control(
                    'filter_wrapper_margin',
                    [
                        'label'      => esc_html__('Filter Wrapper Margin', 'fancy-post-grid'),
                        'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                        'size_units' => ['px', '%', 'em'],
                        'selectors'  => [
                            '{{WRAPPER}} .filter-button-group' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                        ],
                    ]
                );

                $this->add_responsive_control(
                    'filter_wrapper_padding',
                    [
                        'label'      => esc_html__('Filter Wrapper Padding', 'fancy-post-grid'),
                        'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                        'size_units' => ['px', '%', 'em'],
                        'selectors'  => [
                            '{{WRAPPER}} .filter-button-group' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                        ],
                    ]
                );
                $this->add_responsive_control(
                    'filter_wrapper_border_radius',
                    [
                        'label'      => esc_html__('Filter Wrapper Border Radius', 'fancy-post-grid'),
                        'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                        'size_units' => ['px', '%', 'em'],
                        'selectors'  => [
                            '{{WRAPPER}} .filter-button-group' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                        ],
                    ]
                );
                $this->add_control(
                    'filter_wrapper_back_color',
                    [
                        'label'     => esc_html__('Filter Wrapper Background Color', 'fancy-post-grid'),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .filter-button-group' => 'background: {{VALUE}};',
                        ],
                    ]
                );
                // Typography
                $this->add_group_control(
                    \Elementor\Group_Control_Typography::get_type(),
                    [
                        'name'     => 'filter_typography',
                        'label'    => esc_html__( 'Typography', 'fancy-post-grid' ),
                        'selector' => '{{WRAPPER}} .filter-button-group button',
                    ]
                );
                
                $this->add_control(
                    'filter_border_style',
                    [
                        'label'     => esc_html__('Border Style', 'fancy-post-grid'),
                        'type'      => \Elementor\Controls_Manager::SELECT,
                        'options'   => [
                            'default'  => esc_html__('Default', 'fancy-post-grid'),
                            'solid'  => esc_html__('Solid', 'fancy-post-grid'),
                            'dashed' => esc_html__('Dashed', 'fancy-post-grid'),
                            'dotted' => esc_html__('Dotted', 'fancy-post-grid'),
                            'double' => esc_html__('Double', 'fancy-post-grid'),
                            'none'   => esc_html__('None', 'fancy-post-grid'),
                        ],
                        'selectors' => [
                            '{{WRAPPER}} .filter-button-group button' => 'border-style: {{VALUE}};',
                        ],
                        
                    ]
                );
                // Add Border Width
                $this->add_responsive_control(
                    'filter_border_width',
                    [
                        'label'      => esc_html__('Border Width', 'fancy-post-grid'),
                        'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                        'selectors'  => [
                            '{{WRAPPER}} .filter-button-group button' => 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                        ],
                    ]
                );

                // Add Border Radius
                $this->add_responsive_control(
                    'filter_border_radius',
                    [
                        'label'      => esc_html__('Border Radius', 'fancy-post-grid'),
                        'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                        'selectors'  => [
                            '{{WRAPPER}} .filter-button-group button' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                        ],
                    ]
                );

                // Add Tabs for Normal, Hover, and Active
                $this->start_controls_tabs('isotope_filter_tabs');

                // Normal Tab
                $this->start_controls_tab(
                    'isotope_filter_normal',
                    [
                        'label' => esc_html__('Normal', 'fancy-post-grid'),
                    ]
                );

                $this->add_control(
                    'filter_text_color',
                    [
                        'label'     => esc_html__('Text Color', 'fancy-post-grid'),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .filter-button-group button' => 'color: {{VALUE}};',
                        ],
                    ]
                );

                $this->add_control(
                    'filter_background_color',
                    [
                        'label'     => esc_html__('Background Color', 'fancy-post-grid'),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .filter-button-group button' => 'background-color: {{VALUE}};',
                        ],
                    ]
                );

                $this->add_control(
                    'filter_border_color',
                    [
                        'label'     => esc_html__('Border Color', 'fancy-post-grid'),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .filter-button-group button' => 'border-color: {{VALUE}};',
                        ],
                    ]
                );

                $this->end_controls_tab();

                // Hover Tab
                $this->start_controls_tab(
                    'isotope_filter_hover',
                    [
                        'label' => esc_html__('Hover', 'fancy-post-grid'),
                    ]
                );

                $this->add_control(
                    'filter_hover_text_color',
                    [
                        'label'     => esc_html__('Text Color', 'fancy-post-grid'),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .filter-button-group button:hover' => 'color: {{VALUE}};',
                        ],
                    ]
                );

                $this->add_control(
                    'filter_hover_background_color',
                    [
                        'label'     => esc_html__('Background Color', 'fancy-post-grid'),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .filter-button-group button:hover' => 'background-color: {{VALUE}};',
                        ],
                    ]
                );

                $this->add_control(
                    'filter_hover_border_color',
                    [
                        'label'     => esc_html__('Border Color', 'fancy-post-grid'),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .filter-button-group button:hover' => 'border-color: {{VALUE}};',
                        ],
                    ]
                );

                $this->end_controls_tab();

                // Active Tab
                $this->start_controls_tab(
                    'isotope_filter_active',
                    [
                        'label' => esc_html__('Active', 'fancy-post-grid'),
                    ]
                );

                $this->add_control(
                    'filter_active_text_color',
                    [
                        'label'     => esc_html__('Text Color', 'fancy-post-grid'),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .filter-button-group button.active' => 'color: {{VALUE}};',
                        ],
                    ]
                );

                $this->add_control(
                    'filter_active_background_color',
                    [
                        'label'     => esc_html__('Background Color', 'fancy-post-grid'),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .filter-button-group button.active' => 'background-color: {{VALUE}};',
                        ],
                    ]
                );

                $this->add_control(
                    'filter_active_border_color',
                    [
                        'label'     => esc_html__('Border Color', 'fancy-post-grid'),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .filter-button-group button.active' => 'border-color: {{VALUE}};',
                        ],
                    ]
                );

                $this->end_controls_tab();

                $this->end_controls_tabs();

                // Spacing and Styling Controls
                $this->add_responsive_control(
                    'filter_box_margin',
                    [
                        'label'      => esc_html__('Margin', 'fancy-post-grid'),
                        'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                        'size_units' => ['px', '%', 'em'],
                        'selectors'  => [
                            '{{WRAPPER}} .filter-button-group button' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                        ],
                    ]
                );

                $this->add_responsive_control(
                    'filter_box_padding',
                    [
                        'label'      => esc_html__('Padding', 'fancy-post-grid'),
                        'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                        'size_units' => ['px', '%', 'em'],
                        'selectors'  => [
                            '{{WRAPPER}} .filter-button-group button' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                        ],
                    ]
                );

                $this->add_responsive_control(
                    'filter_item_gap',
                    [
                        'label'     => esc_html__('Item Gap', 'fancy-post-grid'),
                        'type'      => \Elementor\Controls_Manager::SLIDER,
                        'size_units' => ['px', '%'],
                        'selectors' => [
                            '{{WRAPPER}} .filter-button-group button' => 'margin-right: {{SIZE}}{{UNIT}};',
                        ],
                    ]
                );

                $this->end_controls_section();
            }
  
            // Slider Style Section
            if (!in_array('slider_style', $this->exclude_controls)) {
                $this->start_controls_section(
                    'slider_style',
                    [
                        'label' => esc_html__( 'Slider', 'fancy-post-grid' ),
                        'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
                    ]
                );

                // Add Tabs for Color, Hover, and Active States
                $this->start_controls_tabs('slider_style_tabs');

                // Color Tab
                $this->start_controls_tab(
                    'slider_style_color_tab',
                    [
                        'label' => esc_html__( 'Color', 'fancy-post-grid' ),
                    ]
                );

                $this->add_control(
                    'slider_dots_color',
                    [
                        'label'     => esc_html__( 'Slider Dots Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .swiper-pagination-bullet' => 'background-color: {{VALUE}};',
                        ],
                    ]
                );

                $this->add_control(
                    'arrow_color',
                    [
                        'label'     => esc_html__( 'Arrow Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .swiper-button-prev::after, {{WRAPPER}} .swiper-button-next::after' => 'color: {{VALUE}};',
                        ],
                    ]
                );

                $this->add_control(
                    'arrow_background_color',
                    [
                        'label'     => esc_html__( 'Arrow Background Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .swiper-button-next, {{WRAPPER}} .swiper-button-prev' => 'background-color: {{VALUE}};',
                        ],
                    ]
                );

                $this->add_control(
                    'fraction_color',
                    [
                        'label'     => esc_html__( 'Fraction Active Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .swiper-pagination-fraction' => 'color: {{VALUE}};',
                        ],
                    ]
                );

                $this->add_control(
                    'progress_color',
                    [
                        'label'     => esc_html__( 'Progress Active Color', 'fancy-post-grid' ),
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
                        'label' => esc_html__( 'Hover', 'fancy-post-grid' ),
                    ]
                );

                $this->add_control(
                    'slider_dots_hover_color',
                    [
                        'label'     => esc_html__( 'Slider Dots Hover Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .swiper-pagination-bullet:hover' => 'background-color: {{VALUE}};',
                        ],
                    ]
                );

                $this->add_control(
                    'arrow_hover_color',
                    [
                        'label'     => esc_html__( 'Arrow Hover Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .swiper-button-prev:hover::after, {{WRAPPER}} .swiper-button-prev:hover::after' => 'color: {{VALUE}};',

                        ],
                    ]
                );

                $this->add_control(
                    'arrow_background_hover_color',
                    [
                        'label'     => esc_html__( 'Arrow Background Hover Color', 'fancy-post-grid' ),
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
                        'label' => esc_html__( 'Active', 'fancy-post-grid' ),
                    ]
                );

                $this->add_control(
                    'slider_dots_active_color',
                    [
                        'label'     => esc_html__( 'Slider Dots Active Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .swiper-pagination-bullet-active' => 'background-color: {{VALUE}};',
                        ],
                    ]
                );

                $this->add_control(
                    'fraction_active_color',
                    [
                        'label'     => esc_html__( 'Fraction Active Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .swiper-pagination-fraction .swiper-pagination-current' => 'color: {{VALUE}};',
                        ],
                    ]
                );

                $this->add_control(
                    'progress_active_color',
                    [
                        'label'     => esc_html__( 'Progress Active Color', 'fancy-post-grid' ),
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
                $this->add_responsive_control(
                    'arrow_icon_font_size',
                    [
                        'label'     => esc_html__( 'Arrow Icon Font Size', 'fancy-post-grid' ),
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
                            '{{WRAPPER}} .swiper-button-next::after, {{WRAPPER}} .swiper-button-prev::after' => 'font-size: {{SIZE}}{{UNIT}};',
                        ],
                        'default'   => [
                            'unit' => 'px',
                            'size' => 20,
                        ],
                    ]
                );
                // Arrow Height
                $this->add_responsive_control(
                    'arrow_height',
                    [
                        'label'     => esc_html__( 'Arrow Height', 'fancy-post-grid' ),
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
                            '{{WRAPPER}} .swiper-button-next, {{WRAPPER}} .swiper-button-prev' => 'height: {{SIZE}}{{UNIT}};',
                        ],
                        'default'   => [
                            'unit' => 'px',
                            'size' => 40,
                        ],
                    ]
                );
                // Arrow Width
                $this->add_responsive_control(
                    'arrow_width',
                    [
                        'label'     => esc_html__( 'Arrow Width', 'fancy-post-grid' ),
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
                            '{{WRAPPER}} .swiper-button-next, {{WRAPPER}} .swiper-button-prev' => 'width: {{SIZE}}{{UNIT}};',
                        ],
                        'default'   => [
                            'unit' => 'px',
                            'size' => 40,
                        ],
                    ]
                );

                $this->end_controls_section();
            }

            // Pagination Style
            $this->start_controls_section(
                'pagination_style',
                [
                    'label' => esc_html__('Pagination', 'fancy-post-grid'),
                    'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
                    'condition' => [
                        'show_pagination' => 'yes',
                    ],
                ]
            );

            // Start Normal Style Tab
            $this->start_controls_tabs('pagination_tabs');

            $this->start_controls_tab(
                'pagination_normal',
                [
                    'label' => esc_html__('Normal', 'fancy-post-grid'),
                ]
            );

            $this->add_control(
                'pagination_text_color',
                [
                    'label'     => esc_html__('Text Color', 'fancy-post-grid'),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .fpg-pagination a' => 'color: {{VALUE}};',
                    ],
                ]
            );

            $this->add_control(
                'pagination_background_color',
                [
                    'label'     => esc_html__('Background Color', 'fancy-post-grid'),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .fpg-pagination a' => 'background-color: {{VALUE}};',
                    ],
                ]
            );

            $this->add_control(
                'pagination_border_color',
                [
                    'label'     => esc_html__('Border Color', 'fancy-post-grid'),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .fpg-pagination a' => 'border-color: {{VALUE}};',
                    ],
                ]
            );

            

            $this->end_controls_tab(); // End Normal Tab

            // Start Hover Style Tab
            $this->start_controls_tab(
                'pagination_hover',
                [
                    'label' => esc_html__('Hover', 'fancy-post-grid'),
                ]
            );

            $this->add_control(
                'pagination_hover_text_color',
                [
                    'label'     => esc_html__('Text Color', 'fancy-post-grid'),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .fpg-pagination a:hover' => 'color: {{VALUE}};',
                    ],
                ]
            );

            $this->add_control(
                'pagination_hover_background_color',
                [
                    'label'     => esc_html__('Background Color', 'fancy-post-grid'),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .fpg-pagination ul.page-numbers li .page-numbers:hover' => 'background: {{VALUE}};',
                    ],
                ]
            );

            $this->add_control(
                'pagination_hover_border_color',
                [
                    'label'     => esc_html__('Border Color', 'fancy-post-grid'),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .fpg-pagination a:hover' => 'border-color: {{VALUE}};',
                    ],
                ]
            );

            $this->end_controls_tab(); // End Hover Tab

            // Start Active Style Tab
            $this->start_controls_tab(
                'pagination_active',
                [
                    'label' => esc_html__('Active', 'fancy-post-grid'),
                ]
            );

            $this->add_control(
                'pagination_active_text_color',
                [
                    'label'     => esc_html__('Text Color', 'fancy-post-grid'),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .fpg-pagination .current,{{WRAPPER}} .rs-blog-layout-15 .fpg-pagination ul.page-numbers li .page-numbers.current' => 'color: {{VALUE}} !important;',
                    ],
                ]
            );

            $this->add_control(
                'pagination_active_background_color',
                [
                    'label'     => esc_html__('Background Color', 'fancy-post-grid'),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .fpg-pagination .current,{{WRAPPER}} .rs-blog-layout-15 .fpg-pagination ul.page-numbers li .page-numbers.current' => 'background-color: {{VALUE}} !important;',
                    ],
                ]
            );

            $this->add_control(
                'pagination_active_border_color',
                [
                    'label'     => esc_html__('Border Color', 'fancy-post-grid'),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .fpg-pagination .current,{{WRAPPER}} .rs-blog-layout-15 .fpg-pagination ul.page-numbers li .page-numbers.current' => 'border-color: {{VALUE}} !important;',
                    ],
                ]
            );

            $this->end_controls_tab(); // End Active Tab

            $this->end_controls_tabs(); // End Tabs
            $this->add_control(
                'pagination_border_style',
                [
                    'label'     => esc_html__('Border Style', 'fancy-post-grid'),
                    'type'      => \Elementor\Controls_Manager::SELECT,
                    'options'   => [
                        'default'  => esc_html__('Default', 'fancy-post-grid'),
                        'solid'  => esc_html__('Solid', 'fancy-post-grid'),
                        'dashed' => esc_html__('Dashed', 'fancy-post-grid'),
                        'dotted' => esc_html__('Dotted', 'fancy-post-grid'),
                        'double' => esc_html__('Double', 'fancy-post-grid'),
                        'none'   => esc_html__('None', 'fancy-post-grid'),
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .fpg-pagination a,{{WRAPPER}} .fpg-pagination .current' => 'border-style: {{VALUE}};',
                    ],
                    
                ]
            );
            // Add Border Width
            $this->add_responsive_control(
                'pagination_border_width',
                [
                    'label'      => esc_html__('Border Width', 'fancy-post-grid'),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'selectors'  => [
                        '{{WRAPPER}} .fpg-pagination a,{{WRAPPER}} .fpg-pagination .current' => 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ],
                ]
            );

            // Add Border Radius
            $this->add_responsive_control(
                'pagination_border_radius',
                [
                    'label'      => esc_html__('Border Radius', 'fancy-post-grid'),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'selectors'  => [
                        '{{WRAPPER}} .fpg-pagination a,{{WRAPPER}} .fpg-pagination .current' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ],
                ]
            );

            $this->add_responsive_control(
                'pagination_padding',
                [
                    'label'      => esc_html__('Padding', 'fancy-post-grid'),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'selectors'  => [
                        '{{WRAPPER}} .fpg-pagination a,{{WRAPPER}} .fpg-pagination .current,{{WRAPPER}} .fpg-pagination ul.page-numbers li .page-numbers.next,{{WRAPPER}} .fpg-pagination ul.page-numbers li .page-numbers.prev' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ],
                ]
            );

            $this->add_responsive_control(
                'pagination_margin',
                [
                    'label'      => esc_html__('Margin', 'fancy-post-grid'),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'selectors'  => [
                        '{{WRAPPER}} .fpg-pagination' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ],
                ]
            );
            $this->add_responsive_control(
                'pagination_gap',
                [
                    'label'      => esc_html__('Gap', 'fancy-post-grid'),
                    'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                    'selectors'  => [
                        '{{WRAPPER}} .fpg-pagination a' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ],
                ]
            );

            // Add Alignment
            $this->add_responsive_control(
                'pagination_alignment',
                [
                    'label'        => esc_html__('Alignment', 'fancy-post-grid'),
                    'type'         => \Elementor\Controls_Manager::CHOOSE,
                    'options'      => [
                        'flex-start' => [
                            'title' => esc_html__('Left', 'fancy-post-grid'),
                            'icon'  => 'eicon-text-align-left',
                        ],
                        'center' => [
                            'title' => esc_html__('Center', 'fancy-post-grid'),
                            'icon'  => 'eicon-text-align-center',
                        ],
                        'flex-end' => [
                            'title' => esc_html__('Right', 'fancy-post-grid'),
                            'icon'  => 'eicon-text-align-right',
                        ],
                    ],
                    'selectors'    => [
                        '{{WRAPPER}} .fpg-pagination' => 'justify-content: {{VALUE}};',
                    ],
                ]
            );

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

            // Render isotope layout
            if ($list_layout === 'liststyle01') {
                $this->render_list_style_01();
            } elseif ($list_layout === 'liststyle02') {
                $this->render_list_style_02();
            } elseif ($list_layout === 'liststyle03') {
                $this->render_list_style_03();
            }elseif ($list_layout === 'liststyle04') {
                $this->render_list_style_04();
            } elseif ($list_layout === 'liststyle05') {
                $this->render_list_style_05();
            }elseif ($list_layout === 'liststyle06') {
                $this->render_list_style_06();
            } elseif ($list_layout === 'liststyle07') {
                $this->render_list_style_07();
            } elseif ($list_layout === 'liststyle08') {
                $this->render_list_style_08();
            } 
        }

       
        protected function render_grid_style_01() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style-01.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Grid Style 01 template not found.', 'fancy-post-grid') . '</div>';
            }
        }

        protected function render_grid_style_02() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style-02.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Grid Style 02 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_grid_style_03() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style-03.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Grid Style 03 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_grid_style_04() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style-04.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Grid Style 04 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_grid_style_05() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style-05.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Grid Style 05 template not found.', 'fancy-post-grid') . '</div>';
            }
        }

        protected function render_grid_style_06() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style-06.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Grid Style 06 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_grid_style_07() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style-07.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Grid Style 07 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_grid_style_08() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style-08.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Grid Style 08 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_grid_style_09() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style-09.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Grid Style 09 template not found.', 'fancy-post-grid') . '</div>';
            }
        }

        protected function render_grid_style_10() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style-10.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Grid Style 10 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_grid_style_11() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style-11.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Grid Style 11 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_grid_style_12() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style-12.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Grid Style 12 template not found.', 'fancy-post-grid') . '</div>';
            }
        }

        protected function render_slider_style_01() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/slider-style-01.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Slider Style 01 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_slider_style_02() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/slider-style-02.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Slider Style 02 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_slider_style_03() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/slider-style-03.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Slider Style 03 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_slider_style_04() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/slider-style-04.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Slider Style 04 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_slider_style_05() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/slider-style-05.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Slider Style 05 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_slider_style_06() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/slider-style-06.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Slider Style 06 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_slider_style_07() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/slider-style-07.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Slider Style 07 template not found.', 'fancy-post-grid') . '</div>';
            }
        }

        protected function render_isotope_style_01() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/isotope-style-01.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Isotope Style 01 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_isotope_style_02() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/isotope-style-02.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Isotope Style 02 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_isotope_style_03() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/isotope-style-03.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Isotope Style 03 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_isotope_style_04() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/isotope-style-04.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Isotope Style 04 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_isotope_style_05() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/isotope-style-05.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Isotope Style 05 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_isotope_style_06() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/isotope-style-06.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Isotope Style 06 template not found.', 'fancy-post-grid') . '</div>';

            }
        }protected function render_isotope_style_07() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/isotope-style-07.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
               echo '<div class="error">' . esc_html__('Isotope Style 07 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_list_style_01() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/list-style-01.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('List Style 01 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_list_style_02() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/list-style-02.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('List Style 02 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_list_style_03() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/list-style-03.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('List Style 03 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_list_style_04() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/list-style-04.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('List Style 04 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_list_style_05() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/list-style-05.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('List Style 05 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_list_style_06() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/list-style-06.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('List Style 06 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_list_style_07() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/list-style-07.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('List Style 07 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_list_style_08() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/list-style-08.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('List Style 08 template not found.', 'fancy-post-grid') . '</div>';
            }
        }  
    }

    // FPG-Grid Layout Widget
    class Fancy_Post_Grid_Layout_Widget extends Fancy_Post_Grid_Base_Widget {
        protected $exclude_controls = ['fancy_post_slider_layout','fancy_post_list_layout','fancy_post_isotope_layout','slider_pagination_type','slider_section','slider_style','col_desktop_slider','col_lg_slider','col_md_slider','col_sm_slider','col_xs_slider','isotope_section','isotope_style','thumbnail_left_size','thumbnail_right_size'];
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
        protected $exclude_controls = ['fancy_post_grid_layout', 'fancy_post_list_layout','fancy_post_isotope_layout','columns','show_pagination','col_desktop','col_lg','col_md','col_sm','col_xs','isotope_section','isotope_style','thumbnail_left_size','thumbnail_right_size'];
        public function get_name() {
            return 'fpg_slider_layout';
        }

        public function get_title() {
            return __('FPG - Slider Layout', 'fancy-post-grid');
        }

        public function get_icon() {
            return 'eicon-slider-album';
        }

        public function get_categories() {
            return array('fancy-post-grid-category');
        }
        
    }

    // FPG-ISOTOPE Layout Widget
    class Fancy_Post_Isotope_Layout_Widget extends Fancy_Post_Grid_Base_Widget {
        
        // Specify which controls to exclude
        protected $exclude_controls = ['fancy_post_grid_layout','show_pagination_on', 'fancy_post_slider_layout','fancy_post_list_layout','slider_columns','slider_pagination_type','slider_section','slider_style','col_desktop_slider','col_lg_slider','col_md_slider','col_sm_slider','col_xs_slider','thumbnail_left_size','thumbnail_right_size'];
        public function get_name() {
            return 'fpg_isotope_layout';
        }

        public function get_title() {
            return __('FPG - Isotope Layout', 'fancy-post-grid');
        }

        public function get_icon() {
            return 'eicon-posts-grid';
        }

        public function get_categories() {
            return array('fancy-post-grid-category');
        }
        
    }
    // FPG-List Layout Widget
    class Fancy_Post_List_Layout_Widget extends Fancy_Post_Grid_Base_Widget {
        
        // Specify which controls to exclude
        protected $exclude_controls = ['fancy_post_grid_layout','show_pagination_on', 'fancy_post_slider_layout','fancy_post_isotope_layout','slider_columns','slider_pagination_type','slider_section','slider_style','col_desktop_slider','col_lg_slider','col_md_slider','col_sm_slider','col_xs_slider','isotope_section','isotope_style','col_desktop','col_lg','col_md','col_sm','col_xs','space_between','space_between_lg','space_between_md','space_between_sm','space_between_xs'];
        public function get_name() {
            return 'fpg_list_layout';
        }

        public function get_title() {
            return __('FPG - List Layout', 'fancy-post-grid');
        }

        public function get_icon() {
            return 'eicon-post-list';
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
