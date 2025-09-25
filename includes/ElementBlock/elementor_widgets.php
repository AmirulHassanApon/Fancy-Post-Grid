<?php

add_action('elementor/elements/categories_registered', function ($elements_manager) {
    $elements_manager->add_category(
        'fancy-post-grid-category',
        array(
            'title' => esc_html__('Fancy Post Grid', 'fancy-post-grid'),
            'icon'  => 'fa fa-th', // Optional icon for the category
        ),
        -1 // Priority set to 0 to place it at the top
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
            // Add control for Card Layout selection 
            // Check if the control is excluded before adding it
            if (!in_array('fancy_post_card_layout', $this->exclude_controls)) {
                $this->add_control(
                    'fancy_post_card_layout',
                    [                    
                        'label'   => esc_html__( 'Card Style', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::CHOOSE,
                        'classes' => 'fpg-el-control-post-chooser-card-thumb',
                        'options' => [
                            'cardstyle01' => [
                                'title' => esc_html__( 'Small Card 01', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-left',
                            ],
                            'cardstyle02' => [
                                'title' => esc_html__( 'Small Card 02', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-center',
                            ],
                            'cardstyle17' => [
                                'title' => esc_html__( 'Small Card 03', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            
                            'cardstyle05' => [
                                'title' => esc_html__( 'Small Card 04', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            
                            'cardstyle13' => [
                                'title' => esc_html__( 'Small Card 05', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'cardstyle16' => [
                                'title' => esc_html__( 'Small Card 06', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'cardstyle14' => [
                                'title' => esc_html__( 'Small Card 07', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'cardstyle27' => [
                                'title' => esc_html__( 'Small Card 08', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'cardstyle03' => [
                                'title' => esc_html__( 'Small Card 09', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'cardstyle04' => [
                                'title' => esc_html__( 'Small Card 10', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],'cardstyle15' => [
                                'title' => esc_html__( 'Small Card 11', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],'cardstyle18' => [
                                'title' => esc_html__( 'Small Card 12', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],'cardstyle19' => [
                                'title' => esc_html__( 'Small Card 13', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'cardstyle06' => [
                                'title' => esc_html__( 'Medium Card 01', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'cardstyle07' => [
                                'title' => esc_html__( 'Medium Card 02', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],'cardstyle26' => [
                                'title' => esc_html__( 'Medium Card 03', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'cardstyle08' => [
                                'title' => esc_html__( 'Overlay Card 01', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'cardstyle09' => [
                                'title' => esc_html__( 'Categories Card 01', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],'cardstyle20' => [
                                'title' => esc_html__( 'Categories Card 02', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'cardstyle10' => [
                                'title' => esc_html__( 'Trending Card 01', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],'cardstyle23' => [
                                'title' => esc_html__( 'Trending Card 02', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],'cardstyle24' => [
                                'title' => esc_html__( 'Trending Card 03', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'cardstyle11' => [
                                'title' => esc_html__( 'Video Card 01', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            'cardstyle12' => [
                                'title' => esc_html__( 'Video Card 02', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],'cardstyle21' => [
                                'title' => esc_html__( 'Video Card 03', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],'cardstyle22' => [
                                'title' => esc_html__( 'Video Card 04', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],'cardstyle25' => [
                                'title' => esc_html__( 'Video Card 05', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-right',
                            ],
                            
                        ],
                        
                        'default' => 'cardstyle01',
                        'toggle' => true,
                    ]
                );
            }
            // Add control for Card Layout selection 
            // Check if the control is excluded before adding it
            if (!in_array('fancy_post_title_layout', $this->exclude_controls)) {
                $this->add_control(
                    'fancy_post_title_layout',
                    [                    
                        'label'   => esc_html__( 'Section Title Style', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::CHOOSE,
                        'classes' => 'fpg-el-control-post-chooser-title-thumb',
                        'options' => [
                            'titlestyle01' => [
                                'title' => esc_html__( 'Title 01', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-left',
                            ],
                            'titlestyle02' => [
                                'title' => esc_html__( 'Title 02', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-center',
                            ],
                            'titlestyle03' => [
                                'title' => esc_html__( 'Title 03', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-center',
                            ],
                            'titlestyle04' => [
                                'title' => esc_html__( 'Title 04', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-left',
                            ],
                            'titlestyle05' => [
                                'title' => esc_html__( 'Title 05', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-center',
                            ],
                            'titlestyle06' => [
                                'title' => esc_html__( 'Title 06', 'fancy-post-grid' ),
                                'icon' => 'eicon-text-align-center',
                            ],
                            
                        ],
                        
                        'default' => 'titlestyle01',
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
                        'classes' => 'fpg-el-control-post-chooser-thumb fpg-el-pro',
                        'separator' => 'before',
                        
                    ]
                );
            }
            // Add control for number of Desktops Above 1200px Card
            
                $this->add_control(
                    'col_desktop_card',
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
                        'classes' => 'fpg-el-control-post-chooser-thumb fpg-el-pro',
                        'separator' => 'before',
                        'condition' => [
                            'fancy_post_card_layout' => [ 'cardstyle01', 'cardstyle02','cardstyle03','cardstyle27', 'cardstyle04','cardstyle05','cardstyle06', 'cardstyle07','cardstyle13', 'cardstyle14','cardstyle15','cardstyle16', 'cardstyle17','cardstyle18','cardstyle19','cardstyle09' ,'cardstyle21','cardstyle22','cardstyle23','cardstyle26' ],
                            
                        ],
                        
                    ]
                );
            
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

            $this->add_control(
                'col_lg_card',
                [
                    'label'   => esc_html__('Large 1199px to 992px', 'fancy-post-grid'),
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
                    'condition' => [
                        'fancy_post_card_layout' => [ 'cardstyle01', 'cardstyle02','cardstyle03','cardstyle27', 'cardstyle04','cardstyle05','cardstyle06', 'cardstyle07','cardstyle13', 'cardstyle14','cardstyle15','cardstyle16', 'cardstyle17','cardstyle18','cardstyle19','cardstyle09','cardstyle21' ,'cardstyle22','cardstyle23','cardstyle26' ],
                        
                    ],
                    'separator' => 'before',
                ]
            );
            
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

            $this->add_control(
                'col_md_card',
                [
                    'label'   => esc_html__('Medium 991px to 768px', 'fancy-post-grid'),
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
                    'condition' => [
                        'fancy_post_card_layout' => [ 'cardstyle01', 'cardstyle02','cardstyle03','cardstyle27', 'cardstyle04','cardstyle05','cardstyle06', 'cardstyle07','cardstyle13', 'cardstyle14','cardstyle15','cardstyle16', 'cardstyle17','cardstyle18','cardstyle19' ,'cardstyle09','cardstyle21','cardstyle22','cardstyle23','cardstyle26'],
                        
                    ],
                    'separator' => 'before',
                ]
            );
            
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
            // Title Source control
            if (!in_array('title_content', $this->exclude_controls)) { 
                $this->start_controls_section(
                        'title_content',
                        [
                            'label' => esc_html__( 'Section Title', 'fancy-post-grid' ),
                            'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
                        ]
                    );
                $this->add_control(
                    'fancy_post_title_source',
                    [
                        'label'   => esc_html__( 'Title Source', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'options' => array(
                            'page' => esc_html__( 'Page Title', 'fancy-post-grid' ),
                            'custom'  => esc_html__( 'Custom Title', 'fancy-post-grid' ),
                        ),
                        'default' => 'custom',
                    ]
                );

                // Prefix Text (visible only for Page Title)
                $this->add_control(
                    'fancy_post_title_prefix',
                    [
                        'label'       => esc_html__( 'Title Prefix Text', 'fancy-post-grid' ),
                        'type'        => \Elementor\Controls_Manager::TEXT,
                        'placeholder' => esc_html__( 'Enter prefix text', 'fancy-post-grid' ),
                        'condition'   => [
                            'fancy_post_title_source' => 'page',
                        ],
                    ]
                );

                // Suffix Text (visible only for Page Title)
                $this->add_control(
                    'fancy_post_title_suffix',
                    [
                        'label'       => esc_html__( 'Title Suffix Text', 'fancy-post-grid' ),
                        'type'        => \Elementor\Controls_Manager::TEXT,
                        'placeholder' => esc_html__( 'Enter suffix text', 'fancy-post-grid' ),
                        'condition'   => [
                            'fancy_post_title_source' => 'page',
                        ],
                    ]
                );

                // Custom Title (only when Title Source = Custom)
                $this->add_control(
                    'fancy_post_custom_title',
                    [
                        'label'       => esc_html__( 'Section Title', 'fancy-post-grid' ),
                        'type'        => \Elementor\Controls_Manager::TEXT,
                        'placeholder' => esc_html__( 'Section Title', 'fancy-post-grid' ),
                        'condition'   => [
                            'fancy_post_title_source' => 'custom',
                        ],
                    ]
                );

                // Enable External Link switcher
                $this->add_control(
                    'fancy_post_enable_external',
                    [
                        'label'        => esc_html__( 'Enable External Link', 'fancy-post-grid' ),
                        'type'         => \Elementor\Controls_Manager::SWITCHER,
                        'label_on'     => esc_html__( 'Yes', 'fancy-post-grid' ),
                        'label_off'    => esc_html__( 'No', 'fancy-post-grid' ),
                        'return_value' => 'yes',
                        'default'      => '',
                    ]
                );

                // External Link URL (only if switcher enabled)
                $this->add_control(
                    'fancy_post_external_link_url',
                    [
                        'label'       => esc_html__( 'External Link URL', 'fancy-post-grid' ),
                        'type'        => \Elementor\Controls_Manager::URL,
                        'placeholder' => esc_html__( 'https://example.com', 'fancy-post-grid' ),
                        'condition'   => [
                            'fancy_post_enable_external' => 'yes',
                        ],
                    ]
                );

                // External Link Text (only if switcher enabled)
                $this->add_control(
                    'fancy_post_external_link_text',
                    [
                        'label'       => esc_html__( 'Link Text', 'fancy-post-grid' ),
                        'type'        => \Elementor\Controls_Manager::TEXT,
                        'placeholder' => esc_html__( 'Read More', 'fancy-post-grid' ),
                        'condition'   => [
                            'fancy_post_enable_external' => 'yes',
                        ],
                    ]
                );
                $this->end_controls_section();
            }
            // Query Builder
            if (!in_array('query_builder_section', $this->exclude_controls)) {  
                $this->start_controls_section(
                    'query_builder_section',
                    [
                        'label' => esc_html__( 'Query Builder', 'fancy-post-grid' ),
                        'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
                    ]
                );
                // 🔹 Featured Posts Filter
                $this->add_control(
                    'featured_filter',
                    [
                        'label'        => esc_html__( 'Featured Posts Only', 'fancy-post-grid' ),
                        'type'         => \Elementor\Controls_Manager::SWITCHER,
                        'label_on'     => esc_html__( 'Yes', 'fancy-post-grid' ),
                        'label_off'    => esc_html__( 'No', 'fancy-post-grid' ),
                        'return_value' => 'yes',
                        'default'      => '',
                    ]
                );
                // 🔹 Popular Posts Filter
                $this->add_control(
                    'popular_filter',
                    [
                        'label'        => esc_html__( 'Popular Posts by Views', 'fancy-post-grid' ),
                        'type'         => \Elementor\Controls_Manager::SWITCHER,
                        'label_on'     => esc_html__( 'Yes', 'fancy-post-grid' ),
                        'label_off'    => esc_html__( 'No', 'fancy-post-grid' ),
                        'return_value' => 'yes',
                        'default'      => '',
                    ]
                );

                // 🔹 Popular Order
                $this->add_control(
                    'popular_order',
                    [
                        'label'   => esc_html__( 'Order By Views', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'options' => [
                            'DESC' => esc_html__( 'Descending (Most to Least Views)', 'fancy-post-grid' ),
                            'ASC'  => esc_html__( 'Ascending (Least to Most Views)', 'fancy-post-grid' ),
                        ],
                        'default' => 'DESC',
                        'condition' => [
                            'popular_filter' => 'yes', // show only if enabled
                        ],
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
                        'condition' => [
                            'popular_filter' => '', // show only if disabled
                        ],
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
            }
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
            if (!in_array('link_section', $this->exclude_controls)) {
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
            }

            // Style Section
            if (!in_array('style_settings', $this->exclude_controls)) {
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

                if (!in_array('show_post_excerpt', $this->exclude_controls)) {
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
                }
                // Card Excerpt
                $this->add_control(
                    'show_post_excerpt_card',
                    [                    
                        'label'       => esc_html__( 'Show Post Excerpt', 'fancy-post-grid' ),
                        'type'        => \Elementor\Controls_Manager::SWITCHER,
                        'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                        'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                        'return_value' => 'yes',
                        'default' => 'yes',
                        'condition' => [
                            'fancy_post_card_layout' => [ 'cardstyle06' ],
                            
                        ],
                        'render_type' => 'template'
                    ]
                );
                
                if (!in_array('show_post_readmore', $this->exclude_controls)) {
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
                }
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
                if (!in_array('show_post_date', $this->exclude_controls)) {
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
                }
                $this->add_control(
                    'show_post_date_card',
                    [
                        'label'   => esc_html__( '- Show Post Date', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::SWITCHER,
                        'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                        'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                        'return_value' => 'yes',
                        'default' => 'yes',
                        'condition' => [
                            'fancy_post_card_layout' => [ 'cardstyle06','cardstyle07','cardstyle26','cardstyle08' ,'cardstyle10','cardstyle23' ,'cardstyle24','cardstyle11','cardstyle12' ],
                            
                        ],
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
                if (!in_array('show_post_categories', $this->exclude_controls)) {
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
                }
                $this->add_control(
                    'show_post_categories_card',
                    [
                        'label'   => esc_html__( '- Show Post Categories', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::SWITCHER,
                        'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                        'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                        'return_value' => 'yes',
                        'default' => 'yes',
                        'condition' => [
                            'fancy_post_card_layout' => [ 'cardstyle01', 'cardstyle02','cardstyle03','cardstyle27', 'cardstyle04','cardstyle05', 'cardstyle06','cardstyle07', 'cardstyle08','cardstyle10', 'cardstyle11','cardstyle12', 'cardstyle13', 'cardstyle15','cardstyle16', 'cardstyle17','cardstyle18','cardstyle19','cardstyle21','cardstyle23','cardstyle24','cardstyle25' ,'cardstyle26' ],
                            
                        ],
                        'render_type' => 'template'
                    ]
                );
                $this->add_control(
                    'show_post_views',
                    [
                        'label'   => esc_html__( '- Show Post Views', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::SWITCHER,
                        'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                        'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                        'return_value' => 'yes',
                        'default' => 'yes',
                        'condition' => [
                            'fancy_post_card_layout' => [ 'cardstyle01', 'cardstyle02','cardstyle03','cardstyle27', 'cardstyle04','cardstyle05', 'cardstyle06','cardstyle07', 'cardstyle08','cardstyle10', 'cardstyle11','cardstyle12', 'cardstyle13', 'cardstyle14', 'cardstyle15','cardstyle16', 'cardstyle17','cardstyle18','cardstyle19','cardstyle21','cardstyle23','cardstyle24','cardstyle25' ,'cardstyle26' ],
                            
                        ],
                        'render_type' => 'template'
                    ]
                );
                if (!in_array('show_post_tags', $this->exclude_controls)) {
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
                }
                if (!in_array('show_comments_count', $this->exclude_controls)) {
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
                }
                
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
                    'show_post_date_icon_card',
                    [
                        'label'   => esc_html__( '- Show Post Date  Icon ', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::SWITCHER,
                        'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                        'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                        'return_value' => 'yes',
                        'default' => 'yes',
                        'condition' => [
                        'fancy_post_card_layout' => [ 'cardstyle06','cardstyle07','cardstyle26','cardstyle08' ,'cardstyle10','cardstyle23' ,'cardstyle24','cardstyle11','cardstyle12' ],
                        
                        ],
                        'render_type' => 'template'
                    ]
                );
                
                if (!in_array('show_post_categories_icon', $this->exclude_controls)) {
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
                }
                $this->add_control(
                    'show_post_views_icon',
                    [
                        'label'   => esc_html__( '- Show Post Views icon', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::SWITCHER,
                        'label_on' => esc_html__( 'Show', 'fancy-post-grid' ),
                        'label_off' => esc_html__( 'Hide', 'fancy-post-grid' ),
                        'return_value' => 'yes',
                        'default' => 'yes',
                        'condition' => [
                            'fancy_post_card_layout' => [ 'cardstyle01', 'cardstyle02','cardstyle03','cardstyle27', 'cardstyle04','cardstyle05', 'cardstyle06','cardstyle07', 'cardstyle08','cardstyle10', 'cardstyle11','cardstyle12', 'cardstyle13', 'cardstyle14', 'cardstyle15' ,'cardstyle16', 'cardstyle17','cardstyle18','cardstyle19','cardstyle21','cardstyle23','cardstyle24','cardstyle25','cardstyle26'],
                            
                        ],
                        'render_type' => 'template'
                    ]
                );
                if (!in_array('show_post_tags_icon', $this->exclude_controls)) {
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
                }
                if (!in_array('show_comments_count_icon', $this->exclude_controls)) {
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
                }

                $this->end_controls_section();
            }
            // Item Order
            if (!in_array('item_order', $this->exclude_controls)) {
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
                if (!in_array('excerpt_order', $this->exclude_controls)) {
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
                }
                $this->add_responsive_control(
                    'excerpt_order_card',
                    [
                        'label'      => esc_html__( 'Excerpt', 'fancy-post-grid' ),
                        'type'       => \Elementor\Controls_Manager::SLIDER,
                        'selectors'  => [
                            '{{WRAPPER}} .fpg-section-area .fpg-excerpt' => 'order: {{SIZE}};',
                        ],
                        'condition' => [
                            'fancy_post_card_layout' => [ 'cardstyle06' ],
                        ],
                        
                    ]
                );
                
                // Item Order: Button
                if (!in_array('button_order', $this->exclude_controls)) {
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
                }

                $this->end_controls_section();
            }
            // Post Title
            if (!in_array('post_title', $this->exclude_controls)) {
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
                        'label'   => esc_html__( 'Primary Title Tag', 'fancy-post-grid' ),
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
                // Title_secondaery_tag_card
                $this->add_control(
                    'title_secondaery_tag_card',
                    [
                        'label'   => esc_html__( 'Secondary Title Tag', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'options' => array(
                            'h1' => esc_html__( 'H1', 'fancy-post-grid' ),
                            'h2'  => esc_html__( 'H2', 'fancy-post-grid' ),
                            'h3' => esc_html__( 'H3', 'fancy-post-grid' ),
                            'h4'  => esc_html__( 'H4', 'fancy-post-grid' ),
                            'h5' => esc_html__( 'H5', 'fancy-post-grid' ),
                            'h6'  => esc_html__( 'H6', 'fancy-post-grid' ),
                        ),
                        'default' => 'h6',
                        'condition' => [
                            'fancy_post_card_layout' => [ 'cardstyle08', 'cardstyle10','cardstyle11', 'cardstyle12' ],
                            
                        ],
                        'render_type' => 'template'
                    ]
                );
                $this->add_control(
                    'title_secondaery_tag_list',
                    [
                        'label'   => esc_html__( 'Secondary Title Tag', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'options' => [
                            'h1' => esc_html__( 'H1', 'fancy-post-grid' ),
                            'h2' => esc_html__( 'H2', 'fancy-post-grid' ),
                            'h3' => esc_html__( 'H3', 'fancy-post-grid' ),
                            'h4' => esc_html__( 'H4', 'fancy-post-grid' ),
                            'h5' => esc_html__( 'H5', 'fancy-post-grid' ),
                            'h6' => esc_html__( 'H6', 'fancy-post-grid' ),
                        ],
                        'default' => 'h3',
                        'condition' => [
                            'fancy_post_list_layout' => 'liststyle08',
                        ],
                        'render_type' => 'template',
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
            }
            // section Title
            if (!in_array('section_title', $this->exclude_controls)) {
                $this->start_controls_section(
                    'section_title',
                    [
                        'label' => esc_html__( ' Section Title', 'fancy-post-grid' ),
                        'tab'   => \Elementor\Controls_Manager::TAB_SETTINGS,
                    ]
                );
                $this->add_control(
                    'section_title_tag',
                    [
                        'label'   => esc_html__( ' Title Tag', 'fancy-post-grid' ),
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
                
                // Title Crop By
                $this->add_control(
                    'section_title_crop_by',
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
                    'section_title_length',
                    [
                        'label'   => esc_html__( 'Title Length', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::NUMBER,
                        'default' => 30,
                        'min'     => 1,
                    ]
                );

                $this->end_controls_section();
            }
            // Thumbnail Section
            if (!in_array('thumbnail', $this->exclude_controls)) {
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
                            
                            'render_type' => 'template'
                        ]
                    );
                }
                // Thumbnail main Card Styling
                $this->add_control(
                    'thumbnail_size_card',
                    [
                        'label'   => esc_html__( 'Thumbnail Size', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'options' => array(
                            'thumbnail'  => esc_html__( 'Thumbnail', 'fancy-post-grid' ),
                            'medium'     => esc_html__( 'Medium', 'fancy-post-grid' ),
                            'large'      => esc_html__( 'Large', 'fancy-post-grid' ),
                            'full'       => esc_html__( 'Full', 'fancy-post-grid' ),
                            'fancy_post_small01_card_size'=> esc_html__( 'Small Card 01 (130x130)', 'fancy-post-grid' ),
                            'fancy_post_custom_size'=> esc_html__( 'Custom Size (768x500)', 'fancy-post-grid' ),
                            'fancy_post_square'     => esc_html__( 'Square(500x500)', 'fancy-post-grid' ),
                            'fancy_post_landscape'  => esc_html__( 'Landscape(834x550)', 'fancy-post-grid' ),
                            'fancy_post_portrait'   => esc_html__( 'Portrait(421x550)', 'fancy-post-grid' ),
                            'fancy_post_list'       => esc_html__( 'List Size(1200 x 650)', 'fancy-post-grid' ),
                        ),
                        'condition' => [
                            'fancy_post_card_layout' => [ 'cardstyle01', 'cardstyle02','cardstyle03','cardstyle27', 'cardstyle04','cardstyle05', 'cardstyle06','cardstyle07','cardstyle13','cardstyle14','cardstyle15','cardstyle16', 'cardstyle17','cardstyle18','cardstyle19','cardstyle20','cardstyle21','cardstyle22','cardstyle23' ,'cardstyle26' ],
                            
                        ],
                        
                        'render_type' => 'template'
                    ]
                );
                
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
                            'condition' => [
                                'fancy_post_card_layout' => [ 'cardstyle08', 'cardstyle10','cardstyle11', 'cardstyle12' ],
                                
                            ],
                            
                            'render_type' => 'template'
                        ]
                    );
                }
                // Card Thumbnail Right
                $this->add_control(
                    'thumbnail_right_size_card',
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
                        'condition' => [
                            'fancy_post_card_layout' => [ 'cardstyle08', 'cardstyle10','cardstyle11', 'cardstyle12', 'cardstyle24' ],
                            
                        ],
                        
                        'render_type' => 'template'
                    ]
                );
                // Card Thumbnail Left
                $this->add_control(
                    'thumbnail_left_size_card',
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

                        'condition' => [
                            'fancy_post_card_layout' => [ 'cardstyle08', 'cardstyle10', 'cardstyle24' ],
                            
                        ],
                        'render_type' => 'template'
                    ]
                );
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
            }

            // Excerpt / Content Section
            if (!in_array('excerpt_content', $this->exclude_controls)) {
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
                // Expansion Indicator
                $this->add_control(
                    'expansion_indicator',
                    [
                        'label'   => esc_html__( 'Expansion Indicator', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::TEXT,
                        'default' => '...',    
                    ]
                );

                $this->end_controls_section();
            }    
            // END Excerpt / Content Section    

            // Card Excerpt / Content Section
                $this->start_controls_section(
                    'excerpt_content_card',
                    [
                        'label' => esc_html__( ' Excerpt / Content', 'fancy-post-grid' ),
                        'tab'   => \Elementor\Controls_Manager::TAB_SETTINGS,
                        'condition' => [
                            'fancy_post_card_layout' => [ 'cardstyle06' ],
                            
                        ],
                        
                    ]
                );
                // Excerpt Type
                $this->add_control(
                    'excerpt_type_card',
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
                    'excerpt_length_card',
                    [
                        'label'   => esc_html__( 'Excerpt Limit', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::NUMBER,
                        'default' => 10,
                        'min'     => 1,
                    ]
                );
                // Expansion Indicator
                $this->add_control(
                    'expansion_indicator_card',
                    [
                        'label'   => esc_html__( 'Expansion Indicator', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::TEXT,
                        'default' => '...',    
                    ]
                );

                $this->end_controls_section();
            // Card END Excerpt / Content Section    

            // Meta Data Section
            if (!in_array('meta_data_content', $this->exclude_controls)) {
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
            }

            // Button Section
            if (!in_array('read_more_content', $this->exclude_controls)) {
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
            }
            // Card (Post Item) Style
            
            // Media Section
            
                $this->start_controls_section(
                    'media_section',
                    [
                        'label' => esc_html__( 'Media', 'fancy-post-grid' ),
                        'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
                        'condition' => [
                            'fancy_post_card_layout' => [ 'cardstyle25' ],
                            
                        ],
                    ]
                );

                // Image Upload
                $this->add_control(
                    'custom_image',
                    [
                        'label'   => esc_html__( 'Image', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::MEDIA,
                        'default' => [
                            'url' => \Elementor\Utils::get_placeholder_image_src(),
                        ],
                    ]
                );

                // Video Type
                $this->add_control(
                    'video_type',
                    [
                        'label'   => esc_html__( 'Video Type', 'fancy-post-grid' ),
                        'type'    => \Elementor\Controls_Manager::SELECT,
                        'options' => [
                            'youtube' => esc_html__( 'YouTube', 'fancy-post-grid' ),
                            'vimeo'   => esc_html__( 'Vimeo', 'fancy-post-grid' ),
                            'self'    => esc_html__( 'Self Hosted', 'fancy-post-grid' ),
                        ],
                        'default' => 'youtube',
                    ]
                );

                // Video URL
                $this->add_control(
                    'video_url',
                    [
                        'label'       => esc_html__( 'Video URL', 'fancy-post-grid' ),
                        'type'        => \Elementor\Controls_Manager::TEXT,
                        'placeholder' => esc_html__( 'https://youtube.com/watch?v=xxxxxx', 'fancy-post-grid' ),
                        'condition'   => [
                            'video_type' => [ 'youtube', 'vimeo' ],
                        ],
                    ]
                );

                // Self-hosted Video Upload
                $this->add_control(
                    'self_video',
                    [
                        'label'     => esc_html__( 'Self Hosted Video', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::MEDIA,
                        'media_types' => [ 'video' ],
                        'condition' => [
                            'video_type' => 'self',
                        ],
                    ]
                );

                $this->end_controls_section();
            

            // Style Section
            if (!in_array('section_style_style', $this->exclude_controls)) {
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
            }
            // Item Box
            if (!in_array('card_post_item_style', $this->exclude_controls)) {
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
                            '{{WRAPPER}} .fpg-section-area .rs-blog__single, {{WRAPPER}} .rs-blog-layout-1 .blog-item, {{WRAPPER}} .rs-blog-layout-30-item, {{WRAPPER}} .rs-blog-layout-28-item,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item,{{WRAPPER}} .rs-blog__left-blog,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap,{{WRAPPER}} .rs-blog-layout-17-item,{{WRAPPER}} .rs-blog-layout-20-item,{{WRAPPER}} .rs-blog-layout-22-item,{{WRAPPER}} .rs-blog-layout-24-item,{{WRAPPER}} .rs-blog-layout-25-item,{{WRAPPER}} .rs-blog-layout-27-list-item,{{WRAPPER}} .rs-blog-layout-27-item,{{WRAPPER}} .rs-post-overlay.rs-post-overlay-one,{{WRAPPER}} .rs-post-list.rs-list-one,{{WRAPPER}} .rs-post-small' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
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
                            '{{WRAPPER}} .fpg-section-area .rs-blog__single, {{WRAPPER}} .rs-blog-layout-1 .blog-item, {{WRAPPER}} .rs-blog-layout-30-item, {{WRAPPER}} .rs-blog-layout-28-item,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item,{{WRAPPER}} .rs-blog__left-blog,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap,{{WRAPPER}} .rs-blog-layout-17-item,{{WRAPPER}} .rs-blog-layout-20-item,{{WRAPPER}} .rs-blog-layout-22-item,{{WRAPPER}} .rs-blog-layout-24-item,{{WRAPPER}} .rs-blog-layout-25-item,{{WRAPPER}} .rs-blog-layout-27-list-item,{{WRAPPER}} .rs-blog-layout-27-item,{{WRAPPER}} .rs-post-overlay.rs-post-overlay-one,{{WRAPPER}} .rs-post-list.rs-list-one,{{WRAPPER}} .rs-post-small' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
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
                            '{{WRAPPER}} .fpg-section-area .rs-blog__single, {{WRAPPER}} .rs-blog-layout-1 .blog-item, {{WRAPPER}} .rs-blog-layout-30-item, {{WRAPPER}} .rs-blog-layout-28-item,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item,{{WRAPPER}} .rs-blog__left-blog,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap,{{WRAPPER}} .rs-blog-layout-17-item,{{WRAPPER}} .rs-blog-layout-20-item,{{WRAPPER}} .rs-blog-layout-22-item,{{WRAPPER}} .rs-blog-layout-24-item,{{WRAPPER}} .rs-blog-layout-25-item,{{WRAPPER}} .rs-blog-layout-27-list-item,{{WRAPPER}} .rs-blog-layout-27-item,{{WRAPPER}} .rs-post-overlay.rs-post-overlay-one,{{WRAPPER}} .rs-post-list.rs-list-one,{{WRAPPER}} .rs-post-small' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
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
                            '{{WRAPPER}} .fpg-section-area .rs-blog__single,{{WRAPPER}} .rs-blog-layout-26 .rs-blog-layout-26-item .rs-content, {{WRAPPER}} .rs-blog-layout-1 .blog-item, {{WRAPPER}} .rs-blog-layout-30-item, {{WRAPPER}} .rs-blog-layout-28-item,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item,{{WRAPPER}} .rs-blog__left-blog,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap,{{WRAPPER}} .rs-blog-layout-17-item,{{WRAPPER}} .rs-blog-layout-20-item,{{WRAPPER}} .rs-blog-layout-22-item,{{WRAPPER}} .rs-blog-layout-24-item,{{WRAPPER}} .rs-blog-layout-25-item,{{WRAPPER}} .rs-blog-layout-27-list-item,{{WRAPPER}} .rs-blog-layout-27-item,{{WRAPPER}} .rs-post-overlay.rs-post-overlay-one,{{WRAPPER}} .rs-post-list.rs-list-one,{{WRAPPER}} .rs-post-small' => 'background-color: {{VALUE}};',
                            '{{WRAPPER}} .pre-blog-item.style_12:after' => 'border-color: {{VALUE}};',
                        ],
                    ]
                );
                $this->add_group_control(
                    \Elementor\Group_Control_Border::get_type(),
                    [
                        'name' => 'item_border_color',
                        'selector' => '{{WRAPPER}} .fpg-section-area .rs-blog__single, {{WRAPPER}} .rs-blog-layout-1 .blog-item, {{WRAPPER}} .rs-blog-layout-30-item,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item,{{WRAPPER}} .rs-blog__left-blog,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap,{{WRAPPER}} .rs-blog-layout-17-item,{{WRAPPER}} .rs-blog-layout-20-item,{{WRAPPER}} .rs-blog-layout-22-item,{{WRAPPER}} .rs-blog-layout-24-item,{{WRAPPER}} .rs-blog-layout-25-item,{{WRAPPER}} .rs-blog-layout-27-list-item,{{WRAPPER}} .rs-blog-layout-27-item,{{WRAPPER}} .rs-post-overlay.rs-post-overlay-one,{{WRAPPER}} .rs-post-list.rs-list-one,{{WRAPPER}} .rs-post-small',
                    ]
                );

                $this->add_group_control(
                    \Elementor\Group_Control_Box_Shadow::get_type(),
                    [
                        'name'      => 'item_box_shadow',
                        'label'     => esc_html__( 'Box Shadow', 'fancy-post-grid' ),
                        'selector'  => '{{WRAPPER}} .fpg-section-area .rs-blog__single, {{WRAPPER}} .rs-blog-layout-1 .blog-item, {{WRAPPER}} .rs-blog-layout-30-item,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item,{{WRAPPER}} .rs-blog__left-blog,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap,{{WRAPPER}} .rs-blog-layout-17-item,{{WRAPPER}} .rs-blog-layout-20-item,{{WRAPPER}} .rs-blog-layout-22-item,{{WRAPPER}} .rs-blog-layout-24-item,{{WRAPPER}} .rs-blog-layout-25-item,{{WRAPPER}} .rs-blog-layout-27-list-item,{{WRAPPER}} .rs-blog-layout-27-item,{{WRAPPER}} .rs-post-overlay.rs-post-overlay-one,{{WRAPPER}} .rs-post-list.rs-list-one,{{WRAPPER}} .rs-post-small',
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
                            '{{WRAPPER}} .fpg-section-area .rs-blog__single:hover,{{WRAPPER}} .rs-blog-layout-26 .rs-blog-layout-26-item:hover .rs-content, {{WRAPPER}} .rs-blog-layout-1 .blog-item:hover, {{WRAPPER}} .rs-blog-layout-30-item:hover, {{WRAPPER}} .rs-blog-layout-28-item:hover,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item:hover,{{WRAPPER}} .rs-blog__left-blog:hover,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap:hover,{{WRAPPER}} .rs-blog-layout-17-item:hover,{{WRAPPER}} .rs-blog-layout-20-item:hover,{{WRAPPER}} .rs-blog-layout-22-item:hover,{{WRAPPER}} .rs-blog-layout-24-item:hover,{{WRAPPER}} .rs-blog-layout-25-item:hover,{{WRAPPER}} .rs-blog-layout-27-list-item:hover,{{WRAPPER}} .rs-blog-layout-27-item:hover,{{WRAPPER}} .rs-post-overlay.rs-post-overlay-one:hover,{{WRAPPER}} .rs-post-list.rs-list-one:hover,{{WRAPPER}} .rs-post-small:hover' => 'background-color: {{VALUE}};',
                        ],
                    ]
                );
                $this->add_group_control(
                    \Elementor\Group_Control_Border::get_type(),
                    [
                        'name' => 'item_border_color_hover',
                        'selector' => '{{WRAPPER}} .fpg-section-area .rs-blog__single:hover, {{WRAPPER}} .rs-blog-layout-1 .blog-item:hover,{{WRAPPER}} .rs-blog-layout-30-item:hover,{{WRAPPER}} .rs-blog-layout-28-item:hover,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item:hover,{{WRAPPER}} .rs-blog__left-blog:hover,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap:hover,{{WRAPPER}} .rs-blog-layout-17-item:hover,{{WRAPPER}} .rs-blog-layout-20-item:hover,{{WRAPPER}} .rs-blog-layout-22-item:hover,{{WRAPPER}} .rs-blog-layout-24-item:hover,{{WRAPPER}} .rs-blog-layout-25-item:hover,{{WRAPPER}} .rs-blog-layout-27-list-item:hover,{{WRAPPER}} .rs-blog-layout-27-item:hover,{{WRAPPER}} .rs-post-overlay.rs-post-overlay-one:hover ,{{WRAPPER}} .rs-post-list.rs-list-one:hover,{{WRAPPER}} .rs-post-small:hover ',
                        'render_type' => 'template'
                    ]
                );

                $this->add_group_control(
                    \Elementor\Group_Control_Box_Shadow::get_type(),
                    [
                        'name'      => 'item_box_shadow_hover',
                        'label'     => esc_html__( 'Box Shadow', 'fancy-post-grid' ),
                        'selector'  => '{{WRAPPER}} .fpg-section-area .rs-blog__single:hover, {{WRAPPER}} .rs-blog-layout-1 .blog-item:hover,{{WRAPPER}} .rs-blog-layout-30-item:hover,{{WRAPPER}} .rs-blog-layout-28-item:hover,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item:hover,{{WRAPPER}} .rs-blog__left-blog:hover,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap:hover,{{WRAPPER}} .rs-blog-layout-17-item:hover,{{WRAPPER}} .rs-blog-layout-20-item:hover,{{WRAPPER}} .rs-blog-layout-22-item:hover,{{WRAPPER}} .rs-blog-layout-24-item:hover,{{WRAPPER}} .rs-blog-layout-25-item:hover,{{WRAPPER}} .rs-blog-layout-27-list-item:hover,{{WRAPPER}} .rs-blog-layout-27-item:hover,{{WRAPPER}} .rs-post-overlay.rs-post-overlay-one:hover,{{WRAPPER}} .rs-post-list.rs-list-one:hover,{{WRAPPER}} .rs-post-small:hover',
                        'render_type' => 'template'
                    ]
                );

                $this->end_controls_tab();

                $this->end_controls_tabs();

                $this->end_controls_section();
            }    
            // Content Box
            if (!in_array('post_content_box', $this->exclude_controls)) {
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
                        'selector' => '{{WRAPPER}} .fpg-section-area .rs-blog__single .rs-content,{{WRAPPER}} .rs-blog-layout-1 .blog-item .blog-content,{{WRAPPER}} .rs-blog-layout-30-item .rs-content,{{WRAPPER}} .rs-content,{{WRAPPER}} .rs-blog__single .content,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content,{{WRAPPER}} .pre-blog-item.style_12:hover .blog-inner-wrap .pre-blog-content,{{WRAPPER}} .rs-blog__content,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap .blog-content,{{WRAPPER}} .rs-post-overlay.rs-post-overlay-one .rs-post-overlay-content,{{WRAPPER}} .rs-post-list.rs-list-one .rs-post-small-content,{{WRAPPER}} .rs-post-small  .rs-post-small-content',
                    ]
                );
                // Content Styling: Background Hover
                $this->add_control(
                    'Hover_content_options',
                    [
                        'label' => esc_html__( 'Hover Background', 'fancy-post-grid' ),
                        'type' => \Elementor\Controls_Manager::HEADING,
                        'separator' => 'before',
                    ]
                );
                $this->add_group_control(
                    \Elementor\Group_Control_Background::get_type(),
                    [
                        'name' => 'card_background_content_hover',
                        'types' => [ 'classic', 'gradient' ],
                        'selector' => '{{WRAPPER}} .fpg-section-area .rs-blog__single:hover .rs-content,{{WRAPPER}} .fpg-section-area .rs-post-overlay-content:hover,{{WRAPPER}} .fpg-section-area .rs-post-small-content:hover,{{WRAPPER}} .rs-post-small .rs-post-small-content:hover',
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
                            '{{WRAPPER}} .fpg-section-area .rs-blog__single .rs-content,{{WRAPPER}} .rs-blog-layout-1 .blog-item .blog-content,{{WRAPPER}} .rs-blog-layout-30-item .rs-content,{{WRAPPER}} .rs-content,{{WRAPPER}} .rs-blog__single .content,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content,{{WRAPPER}} .rs-blog__content,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap .blog-content,{{WRAPPER}} .rs-post-small .rs-post-small-content' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
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
                            '{{WRAPPER}} .fpg-section-area .rs-blog__single .rs-content,{{WRAPPER}} .rs-blog-layout-1 .blog-item .blog-content,{{WRAPPER}} .rs-blog-layout-30-item .rs-content,{{WRAPPER}} .rs-content,{{WRAPPER}} .rs-blog__single .content,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content,{{WRAPPER}} .rs-blog__content,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap .blog-content,{{WRAPPER}} .rs-post-small .rs-post-small-content' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                        ),
                        'render_type' => 'template'
                    ]
                );  
                $this->add_group_control(
                    \Elementor\Group_Control_Border::get_type(),
                    [
                        'name' => 'content_border_color',
                        'selector' => '{{WRAPPER}} .fpg-section-area .rs-blog__single .rs-content,{{WRAPPER}} .rs-blog-layout-1 .blog-item .blog-content,{{WRAPPER}} .rs-blog-layout-30-item .rs-content,{{WRAPPER}} .rs-content,{{WRAPPER}} .rs-blog__single .content,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content,{{WRAPPER}} .rs-blog__content,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap .blog-content,{{WRAPPER}} .rs-post-small .rs-post-small-content',
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
                            '{{WRAPPER}} .fpg-section-area .rs-blog__single .rs-content,{{WRAPPER}} .rs-blog-layout-1 .blog-item .blog-content,{{WRAPPER}} .rs-blog-layout-30-item .rs-content,{{WRAPPER}} .rs-content,{{WRAPPER}} .rs-blog__single .content,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content,{{WRAPPER}} .rs-blog__content,{{WRAPPER}} .blog-horizontal .blog-meta .blog-item-wrap .blog-content,{{WRAPPER}} .rs-post-small .rs-post-small-content' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                        ),
                    ]
                );

                $this->end_controls_section();
            }
            // Thumbnail Style Section
            if (!in_array('thumbnail_style', $this->exclude_controls)) {
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
            }
            // Style Section
            if (!in_array('post_title_style', $this->exclude_controls)) {
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
                        'label'    => esc_html__( 'Primary Typography', 'fancy-post-grid' ),
                        'selector' => '{{WRAPPER}} .fancy-post-title a, {{WRAPPER}} .fancy-post-title, {{WRAPPER}} .rs-blog-layout-27-list-item .rs-content .title a',

                    ]
                );
                $this->add_group_control(
                    \Elementor\Group_Control_Typography::get_type(),
                    [
                        'name'     => 'title_typography_card',
                        'label'    => esc_html__( 'Secondary Typography', 'fancy-post-grid' ),
                        'selector' => '{{WRAPPER}} .title.rs-post-small-title, {{WRAPPER}} .title.rs-post-small-title a,{{WRAPPER}} .title.rs-post-overlay-title-card10, {{WRAPPER}} .title.rs-post-overlay-title-card10 a',
                        'condition' => [
                            'fancy_post_card_layout' => [ 'cardstyle08', 'cardstyle10','cardstyle11', 'cardstyle12' ],
                            
                        ],

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
                        'label' => esc_html__( 'Primary Normal', 'fancy-post-grid' ),
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
                        'label' => esc_html__( 'Primary Hover', 'fancy-post-grid' ),
                    ]
                );

                $this->add_control(
                    'title_hover_color',
                    [
                        'label'     => esc_html__( 'Color', 'fancy-post-grid' ),
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
                        'label'     => esc_html__( 'Background Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => array(
                            '{{WRAPPER}} .fancy-post-title:hover,{{WRAPPER}} .rs-blog-layout-3 .rs-blog__single .content .title a:hover,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-content .title:hover' => 'background-color: {{VALUE}};',
                        ),
                        'render_type' => 'template'
                    ]
                );
                
                $this->end_controls_tab();

                $this->end_controls_tabs(); // End Title Tabs

                // Title Styling: Tabs (Normal, Hover, Box Hover)
                $this->start_controls_tabs('title_style_tabs_card');

                // Normal Tab
                $this->start_controls_tab(
                    'title_normal_card',
                    [
                        'label' => esc_html__( 'Secondary Normal', 'fancy-post-grid' ),
                        'condition' => [
                            'fancy_post_card_layout' => [ 'cardstyle08', 'cardstyle10','cardstyle11', 'cardstyle12' ],
                            
                        ],
                    ]
                );

                $this->add_control(
                    'title_normal_color_card',
                    [
                        'label'     => esc_html__( 'Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        
                        'selectors' => array(
                            
                            '{{WRAPPER}} .title.rs-post-small-title, {{WRAPPER}} .title.rs-post-small-title a,{{WRAPPER}} .title.rs-post-overlay-title-card10, {{WRAPPER}} .title.rs-post-overlay-title-card10 a' => 'color: {{VALUE}};',

                        ),
                        'condition' => [
                            'fancy_post_card_layout' => [ 'cardstyle08', 'cardstyle10','cardstyle11', 'cardstyle12' ],
                            
                        ],
                    ]
                );

                $this->add_control(
                    'title_normal_background_card',
                    [
                        'label'     => esc_html__( 'Background Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => array(
                            '{{WRAPPER}} .title.rs-post-small-title, {{WRAPPER}} .title.rs-post-small-title a,{{WRAPPER}} .title.rs-post-overlay-title-card10' => 'background-color: {{VALUE}};',
                        ),
                        'condition' => [
                            'fancy_post_card_layout' => [ 'cardstyle08', 'cardstyle10','cardstyle11', 'cardstyle12' ],
                            
                        ],
                    ]
                );
                
                $this->end_controls_tab();

                // Hover Tab
                $this->start_controls_tab(
                    'title_hover_card',
                    [
                        'label' => esc_html__( 'Secondary Hover', 'fancy-post-grid' ),
                        'condition' => [
                            'fancy_post_card_layout' => [ 'cardstyle08', 'cardstyle10','cardstyle11', 'cardstyle12' ],
                            
                        ],
                    ]
                );

                $this->add_control(
                    'title_hover_color_card',
                    [
                        'label'     => esc_html__( 'Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => array(
                            '{{WRAPPER}} .title.rs-post-small-title:hover, {{WRAPPER}} .title.rs-post-small-title a:hover,{{WRAPPER}} .title.rs-post-overlay-title-card10:hover,{{WRAPPER}} .title.rs-post-overlay-title-card10 a:hover' => 'color: {{VALUE}};',
                            
                            '{{WRAPPER}} .title.rs-post-small-title.underline a,{{WRAPPER}} .title.rs-post-overlay-title-card10.underline a' => 'background-image: linear-gradient(to bottom, {{VALUE}} 0%, {{VALUE}} 100%) !important;',
                        ),
                        'condition' => [
                            'fancy_post_card_layout' => [ 'cardstyle08', 'cardstyle10','cardstyle11', 'cardstyle12' ],
                            
                        ],
                    ]
                );

                $this->add_control(
                    'title_hover_background_card',
                    [
                        'label'     => esc_html__( 'Background Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => array(
                            '{{WRAPPER}} .title.rs-post-small-title:hover, {{WRAPPER}} .title.rs-post-small-title a:hover,{{WRAPPER}} .title.rs-post-overlay-title-card10:hover' => 'background-color: {{VALUE}};',
                        ),
                        'condition' => [
                            'fancy_post_card_layout' => [ 'cardstyle08', 'cardstyle10','cardstyle11', 'cardstyle12' ],
                            
                        ],
                        'render_type' => 'template'
                    ]
                );
                
                $this->end_controls_tab();

                $this->end_controls_tabs(); // End Title Tabs

                $this->end_controls_section(); // End Post Title Style Section
            }
            // Section Style Section
            if (!in_array('post_section_title_style', $this->exclude_controls)) {
                $this->start_controls_section(
                    'post_section_title_style',
                    [
                        'label' => esc_html__( 'Section Title', 'fancy-post-grid' ),
                        'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
                    ]
                );

                // Title Styling: Typography
                $this->add_group_control(
                    \Elementor\Group_Control_Typography::get_type(),
                    [
                        'name'     => 'section_title_typography',
                        'label'    => esc_html__( 'Primary Typography', 'fancy-post-grid' ),
                        'selector' => '{{WRAPPER}} .title, {{WRAPPER}} .title a',

                    ]
                );
                

                // Title Styling: Alignment
                $this->add_responsive_control(
                    'section_title_alignment',
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
                            '{{WRAPPER}} .title, {{WRAPPER}} .title a' => 'text-align: {{VALUE}};',
                        ),
                    ]
                );           

                // Title Styling: Padding
                $this->add_responsive_control(
                    'section_title_padding',
                    [
                        'label'      => esc_html__( 'Padding', 'fancy-post-grid' ),
                        'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                        'size_units' => array( 'px', 'em', '%' ),
                        'selectors'  => array(
                            '{{WRAPPER}} .title, {{WRAPPER}} .title a' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                        ),
                    ]
                );

                // Title Styling: margin
                $this->add_responsive_control(
                    'section_title_margin',
                    [
                        'label'      => esc_html__( 'Margin', 'fancy-post-grid' ),
                        'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                        'size_units' => array( 'px', 'em', '%' ),
                        'selectors'  => array(
                            '{{WRAPPER}} .title, {{WRAPPER}} .title a' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                        ),
                    ]
                ); 

                // External Icon Size
                $this->add_responsive_control(
                    'section_title_external_icon_size',
                    [
                        'label' => esc_html__( 'External Icon Size', 'fancy-post-grid' ),
                        'type' => \Elementor\Controls_Manager::SLIDER,
                        'size_units' => [ 'px' ],
                        'range' => [
                            'px' => [
                                'min' => 0,
                                'max' => 50,
                            ],
                        ],
                        'selectors' => [
                            '{{WRAPPER}} .section-btn i,{{WRAPPER}} .section-btn a' => 'font-size: {{SIZE}}{{UNIT}};',
                            
                        ],
                        'condition' => [
                            'fancy_post_enable_external' => 'yes',
                        ],
                    ]
                );

                // External Icon Y Position
                $this->add_responsive_control(
                    'section_title_external_icon_y',
                    [
                        'label' => esc_html__( 'External Icon Y Position', 'fancy-post-grid' ),
                        'type' => \Elementor\Controls_Manager::SLIDER,
                        'size_units' => [ 'px' ],
                        'range' => [
                            'px' => [
                                'min' => -70,
                                'max' => 70,
                            ],
                        ],
                        'selectors' => [
                            '{{WRAPPER}} .section-btn' => 'transform: translateY({{SIZE}}{{UNIT}});',
                            
                        ],
                        'condition' => [
                            'fancy_post_enable_external' => 'yes',
                        ],
                    ]
                );


                // Title Styling: Tabs (Normal, Hover, Box Hover)
                $this->start_controls_tabs('section_title_style_tabs');

                /**
                 * ====================
                 * Normal Tab
                 * ====================
                 */
                $this->start_controls_tab(
                    'section_title_normal',
                    [
                        'label' => esc_html__( 'Section Title', 'fancy-post-grid' ),
                    ]
                );

                $this->add_control(
                    'section_title_normal_color',
                    [
                        'label'     => esc_html__( 'Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .title, {{WRAPPER}} .title a' => 'color: {{VALUE}};',
                        ],
                    ]
                );

                // Dot Color
                $this->add_control(
                    'section_title_dot_color',
                    [
                        'label'     => esc_html__( 'Dot Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .rs-section-dot' => 'background-color: {{VALUE}};',
                        ],
                    ]
                );

                // Line/Border Color
                $this->add_control(
                    'section_title_line_color',
                    [
                        'label'     => esc_html__( 'Line / Border Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .rs-section-line:after' => 'background-color: {{VALUE}};',
                            '{{WRAPPER}} .rs-section-line' => 'border-color: {{VALUE}};',
                        ],
                    ]
                );

                // External Link Color
                $this->add_control(
                    'section_title_external_link_color',
                    [
                        'label'     => esc_html__( 'External Link Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .section-btn i,{{WRAPPER}} .section-btn a' => 'color: {{VALUE}};',
                        ],
                        'condition' => [
                            'fancy_post_enable_external' => 'yes',
                        ],
                    ]
                );

                $this->end_controls_tab();

                /**
                 * ====================
                 * Hover Tab
                 * ====================
                 */
                $this->start_controls_tab(
                    'section_title_hover',
                    [
                        'label' => esc_html__( 'Section Title Hover', 'fancy-post-grid' ),
                    ]
                );

                $this->add_control(
                    'section_title_hover_color',
                    [
                        'label'     => esc_html__( 'Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .title:hover, {{WRAPPER}} .title a:hover' => 'color: {{VALUE}};',
                            
                        ],
                    ]
                );

                // External Link Hover Color
                $this->add_control(
                    'section_title_external_link_hover_color',
                    [
                        'label'     => esc_html__( 'External Link Hover Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .section-btn i:hover,{{WRAPPER}} .section-btn a:hover' => 'color: {{VALUE}};',
                        ],
                        'condition' => [
                            'fancy_post_enable_external' => 'yes',
                        ],
                    ]
                );

                $this->end_controls_tab();
                $this->end_controls_tabs();
                 // End Title Tabs

                $this->end_controls_section(); // End Post Title Style Section
            }
            // Excerpt/Content Style
            if (!in_array('excerpt_content_style', $this->exclude_controls)) {
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
            }
            // Card Excerpt/Content Style
            
                $this->start_controls_section(
                    'excerpt_content_style_card',
                    [
                        'label' => esc_html__( 'Excerpt', 'fancy-post-grid' ),
                        'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
                        'condition' => [
                            'fancy_post_card_layout' => [ 'cardstyle06' ],
                            
                        ],
                        
                    ]
                );

                // Typography Control
                $this->add_group_control(
                    \Elementor\Group_Control_Typography::get_type(),
                    [
                        'name'     => 'excerpt_typography_card',
                        'label'    => esc_html__( 'Typography', 'fancy-post-grid' ),
                        'selector' => '{{WRAPPER}} .fancy-post-excerpt',

                    ]
                );

                // Excerpt Padding Control
                $this->add_responsive_control(
                    'excerpt_padding_card',
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
                    'excerpt_margin_card',
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
                    'excerpt_alignment_card',
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
                $this->start_controls_tabs('excerpt_color_tabs_card');

                // Normal Tab
                $this->start_controls_tab(
                    'excerpt_normal_tab_card',
                    [
                        'label' => esc_html__( 'Normal', 'fancy-post-grid' ),
                    ]
                );

                // Excerpt Color Control (Normal)
                $this->add_control(
                    'excerpt_normal_color_card',
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
                    'excerpt_normal_background_card',
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
                    'excerpt_hover_tab_card',
                    [
                        'label' => esc_html__( 'Hover', 'fancy-post-grid' ),
                    ]
                );

                // Excerpt Color on Hover Control
                $this->add_control(
                    'excerpt_hover_color_card',
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
                    'excerpt_hover_background_card',
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
            // Card Excerpt/Content Style

            // Meta Data Style
            if (!in_array('meta_data_style', $this->exclude_controls)) {    
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
                        'selector' => '{{WRAPPER}} .meta-data-list li,{{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-blog-content ul li, {{WRAPPER}} .meta-date span, {{WRAPPER}} .rs-blog-layout-14-item .rs-content .rs-meta div, {{WRAPPER}} .rs-blog-layout-15-item .rs-content .rs-meta, {{WRAPPER}} .rs-blog-layout-16-item .rs-content .rs-meta, {{WRAPPER}} .rs-blog-layout-26-item .rs-content .rs-meta .rs-meta-all, {{WRAPPER}} .rs-blog-layout-26-item .rs-content .rs-meta .rs-meta-all .meta-categories a, {{WRAPPER}} .rs-blog-layout-1 .blog-item .blog-content .blog-meta li a, .rs-blog-layout-1 .blog-item .blog-content .blog-meta li, .rs-blog-layout-1 .blog-item-wrap .blog-content .blog-meta li a,{{WRAPPER}} .rs-blog-layout-26-item .rs-content .rs-meta .meta-category a,{{WRAPPER}} .rs-blog-layout-13-item .rs-thumb .pre-blog-meta .pre-date, {{WRAPPER}} .rs-blog-layout-13-item .rs-thumb .pre-blog-meta .pre-month, {{WRAPPER}} .rs-blog-layout-8 .rs-blog__thumb .rs-category a, {{WRAPPER}} .rs-blog-layout-8 .rs-blog__thumb .rs-category i, {{WRAPPER}} .rs-blog-layout-1.rs-blog-layout-9 .blog-horizontal .blog-meta .blog-item-wrap .blog-content .blog-meta .meta-date,{{WRAPPER}} .rs-blog-layout-1.rs-blog-layout-9 .blog-horizontal .blog-meta .blog-item-wrap .blog-content .blog-meta .admin,{{WRAPPER}} .rs-blog-layout-15-item .rs-thumb .rs-category,{{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-image-wrap .pre-blog-meta .pre-month,{{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-image-wrap .pre-blog-meta .pre-date,{{WRAPPER}} .rs-blog-layout-14-item .rs-content .rs-meta a,{{WRAPPER}} .rs-blog-layout-14-item .rs-content .rs-meta .meta-date,{{WRAPPER}} .blog-item .blog-content .blog-meta li a,{{WRAPPER}} .rs-blog-layout-3 .rs-blog__single .content .rs-blog-category a,{{WRAPPER}} .rs-blog-layout-3 .rs-blog__single .content ul li,{{WRAPPER}} .rs-blog-layout-3 .rs-blog__single .content .rs-blog-author .user a span,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-category a,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-blog-footer .user span,{{WRAPPER}} .rs-blog-layout-25-item .rs-content .rs-cat a,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-content .rs-meta-category a,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-content .rs-meta-category i,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-date .title,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-date span,{{WRAPPER}} .meta-data-list li span,{{WRAPPER}} .rs-post-tag a',

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
                            '{{WRAPPER}} .meta-data-list,{{WRAPPER}} .rs-post-meta ul,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-category,{{WRAPPER}} .rs-post-tag a' => 'justify-content: {{VALUE}};',
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
                            '{{WRAPPER}} .meta-data-list,{{WRAPPER}} .rs-thumb .meta-date span,{{WRAPPER}} .rs-content .rs-meta a,{{WRAPPER}} .rs-blog__item .rs-content .rs-category a,{{WRAPPER}} .rs-blog__single .content .rs-blog-category a,{{WRAPPER}} .rs-content .rs-meta .meta-date,{{WRAPPER}} .rs-content .rs-meta .meta-category a,{{WRAPPER}} .rs-post-tag a' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
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
                            '{{WRAPPER}} .meta-data-list li,{{WRAPPER}} .meta-data-list li a,{{WRAPPER}} .meta-data-list,{{WRAPPER}} .rs-blog-layout-26-item .rs-content .rs-meta .meta-date span,{{WRAPPER}} .rs-blog-layout-26-item .rs-content .rs-meta .meta-category a,{{WRAPPER}} .rs-blog-layout-13-item .rs-thumb .pre-blog-meta .pre-date, {{WRAPPER}} .rs-blog-layout-13-item .rs-thumb .pre-blog-meta .pre-month,{{WRAPPER}} .rs-blog-layout-8 .rs-blog__thumb .rs-category a,{{WRAPPER}} .rs-blog-layout-1.rs-blog-layout-9 .blog-horizontal .blog-meta .blog-item-wrap .blog-content .blog-meta .admin,{{WRAPPER}} .rs-blog-layout-1.rs-blog-layout-9 .blog-horizontal .blog-meta .blog-item-wrap .blog-content .blog-meta .meta-date,{{WRAPPER}} .rs-blog-layout-14-item .rs-content .rs-meta a,{{WRAPPER}} .rs-blog-layout-15-item .rs-thumb .rs-category a,{{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-image-wrap .pre-blog-meta .pre-month,{{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-image-wrap .pre-blog-meta .pre-date,{{WRAPPER}} .rs-blog-layout-14-item .rs-content .rs-meta .meta-date,{{WRAPPER}} .rs-blog-layout-3 .rs-blog__single .content .rs-blog-category a,{{WRAPPER}} .rs-blog-layout-3 .rs-blog__single .content ul li,{{WRAPPER}} .rs-blog-layout-3 .rs-blog__single .content .rs-blog-author .user a span,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-category a,{{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-blog-footer .user span,{{WRAPPER}} .rs-blog-layout-30-item .rs-thumb .meta-date span,{{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-blog-content ul li,{{WRAPPER}} .rs-blog-layout-25-item .rs-content .rs-cat a,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-content .rs-meta-category a,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-content .rs-meta-category i,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-date .title,{{WRAPPER}} .rs-blog-layout-27-list-item .rs-date span,{{WRAPPER}} .rs-post-meta.meta-data-list span.rs-meta,{{WRAPPER}} .rs-post-tag a' => 'color: {{VALUE}};',
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
                            '{{WRAPPER}} .rs-post-tag a,{{WRAPPER}} .rs-category,{{WRAPPER}} .rs-blog-category a' => 'background: {{VALUE}} !important;',
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
                if (!in_array('meta_date_color', $this->exclude_controls)) {
                    $this->add_control(
                        'meta_date_color',
                        [
                            'label'     => esc_html__( 'Date Color', 'fancy-post-grid' ),
                            'type'      => \Elementor\Controls_Manager::COLOR,
                            'selectors' => [
                                '{{WRAPPER}} .rs-blog-layout-27-list-item .rs-date .title' => 'color: {{VALUE}};',
                            ],
                            'condition' => [
                                'fancy_post_list_layout' => 'liststyle08',
                            ],
                        ]
                    );
                }


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
            }

            // Button Style
            if (!in_array('read_more_style', $this->exclude_controls)) {
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
                        'label'     => esc_html__( 'Text Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => array(
                            '{{WRAPPER}} .fpg-section-area a.read-more:hover, {{WRAPPER}} .pre-blog-item.style_12 .blog-inner-wrap .pre-blog-content .blog-btn-part .blog-btn:hover, {{WRAPPER}} .blog-item .blog-content .blog-btn .read-more:hover, {{WRAPPER}} .rs-blog__single .content .rs-blog-author .rs-link a:hover, {{WRAPPER}} .rs-blog-layout-4 .rs-blog__item .rs-content .rs-blog-footer .btn-link:hover, {{WRAPPER}} .rs-blog-layout-4.rs-blog-layout-10 .rs-grid .rs-grid-item .rs-blog__item .rs-content .rs-blog-footer .blog-btn .rs-btn:hover' => 'color: {{VALUE}};',
                            '{{WRAPPER}} .fpg-section-area .fpg-border::before' => 'background: {{VALUE}} !important;',
                        ),
                    ]
                );

                $this->add_control(
                    'readmore_hover_background_color',
                    [
                        'label'     => esc_html__( 'Background Color', 'fancy-post-grid' ),
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
            }    
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
                            '{{WRAPPER}} .swiper-pagination-bullet' => 'background-image: linear-gradient(94.57deg, {{VALUE}} 0.99%, {{VALUE}} 99.43%); ',
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
                            '{{WRAPPER}} .swiper-pagination-bullet:hover' => 'background-image: linear-gradient(94.57deg, {{VALUE}} 0.99%, {{VALUE}} 99.43%); ',
                        ],
                    ]
                );

                $this->add_control(
                    'arrow_hover_color',
                    [
                        'label'     => esc_html__( 'Arrow Hover Color', 'fancy-post-grid' ),
                        'type'      => \Elementor\Controls_Manager::COLOR,
                        'selectors' => [
                            '{{WRAPPER}} .swiper-button-prev:hover::after, {{WRAPPER}} .swiper-button-next:hover::after' => 'color: {{VALUE}};',

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
                            '{{WRAPPER}} .swiper-pagination-bullet-active' => 'background-color: {{VALUE}} !important;',
                            '{{WRAPPER}} .swiper-pagination-bullet-active' => 'background-image: linear-gradient(94.57deg, {{VALUE}} 0.99%, {{VALUE}} 99.43%) !important;',
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
                        '{{WRAPPER}} .fpg-pagination a,{{WRAPPER}} .rs-blog-layout-15 .fpg-pagination ul.fancy-page-numbers li .fpg-page-numbers' => 'color: {{VALUE}};',
                    ],
                ]
            );

            $this->add_control(
                'pagination_background_color',
                [
                    'label'     => esc_html__('Background Color', 'fancy-post-grid'),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .fpg-pagination a,{{WRAPPER}} .rs-blog-layout-15 .fpg-pagination ul.fancy-page-numbers li .fpg-page-numbers' => 'background-color: {{VALUE}};',
                    ],
                ]
            );

            $this->add_control(
                'pagination_border_color',
                [
                    'label'     => esc_html__('Border Color', 'fancy-post-grid'),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .fpg-pagination a,{{WRAPPER}} .rs-blog-layout-15 .fpg-pagination ul.fancy-page-numbers li .fpg-page-numbers' => 'border-color: {{VALUE}};',
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
                        '{{WRAPPER}} .fpg-pagination a:hover,{{WRAPPER}} .rs-blog-layout-15 .fpg-pagination ul.fancy-page-numbers li .fpg-page-numbers:hover' => 'color: {{VALUE}};',
                    ],
                ]
            );

            $this->add_control(
                'pagination_hover_background_color',
                [
                    'label'     => esc_html__('Background Color', 'fancy-post-grid'),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .fpg-pagination ul.fancy-page-numbers li .fpg-page-numbers:hover,{{WRAPPER}} .rs-blog-layout-15 .fpg-pagination ul.fancy-page-numbers li .fpg-page-numbers:hover' => 'background: {{VALUE}};',
                    ],
                ]
            );

            $this->add_control(
                'pagination_hover_border_color',
                [
                    'label'     => esc_html__('Border Color', 'fancy-post-grid'),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .fpg-pagination a:hover,{{WRAPPER}} .rs-blog-layout-15 .fpg-pagination ul.fancy-page-numbers li .fpg-page-numbers:hover' => 'border-color: {{VALUE}};',
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
                        '{{WRAPPER}} .fpg-pagination .current,{{WRAPPER}} .rs-blog-layout-15 .fpg-pagination ul.fancy-page-numbers li .fpg-page-numbers.current' => 'color: {{VALUE}} !important;',
                    ],
                ]
            );

            $this->add_control(
                'pagination_active_background_color',
                [
                    'label'     => esc_html__('Background Color', 'fancy-post-grid'),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .fpg-pagination .current,{{WRAPPER}} .rs-blog-layout-15 .fpg-pagination ul.fancy-page-numbers li .fpg-page-numbers.current' => 'background-color: {{VALUE}} !important;',
                    ],
                ]
            );

            $this->add_control(
                'pagination_active_border_color',
                [
                    'label'     => esc_html__('Border Color', 'fancy-post-grid'),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .fpg-pagination .current,{{WRAPPER}} .rs-blog-layout-15 .fpg-pagination ul.fancy-page-numbers li .fpg-page-numbers.current' => 'border-color: {{VALUE}} !important;',
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
                        '{{WRAPPER}} .fpg-pagination a,{{WRAPPER}} .fpg-pagination .current,{{WRAPPER}} .fpg-pagination ul.fancy-page-numbers li .fpg-page-numbers.next,{{WRAPPER}} .fpg-pagination ul.fancy-page-numbers li .fpg-page-numbers.prev' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
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
            $card_layout = $this->get_settings_for_display('fancy_post_card_layout');
            $title_layout = $this->get_settings_for_display('fancy_post_title_layout');

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

            // Render List layout
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
            } elseif ($list_layout === 'liststyle09') {
                $this->render_list_style_09();
            } elseif ($list_layout === 'liststyle10') {
                $this->render_list_style_10();
            } 

            // Render Card layout

            // Small Card
            if ($card_layout === 'cardstyle01') {
                $this->render_card_style_01();
            } 
            elseif ($card_layout === 'cardstyle02') {
                $this->render_card_style_02();
            } 
            elseif ($card_layout === 'cardstyle03') {
                $this->render_card_style_03();
            }elseif ($card_layout === 'cardstyle27') {
                $this->render_card_style_27();
            }
            elseif ($card_layout === 'cardstyle04') {
                $this->render_card_style_04();
            } 
            elseif ($card_layout === 'cardstyle05') {
                $this->render_card_style_05();
            }
            elseif ($card_layout === 'cardstyle13') {
                $this->render_card_style_13();
            } 
            elseif ($card_layout === 'cardstyle14') {
                $this->render_card_style_14();
            } 
            elseif ($card_layout === 'cardstyle15') {
                $this->render_card_style_15();
            }
            elseif ($card_layout === 'cardstyle16') {
                $this->render_card_style_16();
            } 
            elseif ($card_layout === 'cardstyle17') {
                $this->render_card_style_17();
            } 
            elseif ($card_layout === 'cardstyle18') {
                $this->render_card_style_18();
            } 
            elseif ($card_layout === 'cardstyle19') {
                $this->render_card_style_19();
            } 
            // Medium Card
            elseif ($card_layout === 'cardstyle06') {
                $this->render_card_style_06();
            } 
            elseif ($card_layout === 'cardstyle07') {
                $this->render_card_style_07();
            }
            elseif ($card_layout === 'cardstyle26') {
                $this->render_card_style_26();
            } 

            elseif ($card_layout === 'cardstyle08') {
                $this->render_card_style_08();
            } 
            // Category
            elseif ($card_layout === 'cardstyle09') {
                $this->render_card_style_09();
            } 
            elseif ($card_layout === 'cardstyle20') {
                $this->render_card_style_20();
            } 
            // Trending
            elseif ($card_layout === 'cardstyle10') {
                $this->render_card_style_10();
            }elseif ($card_layout === 'cardstyle23') {
                $this->render_card_style_23();
            } elseif ($card_layout === 'cardstyle24') {
                $this->render_card_style_24();
            }  
            // Video Style
            elseif ($card_layout === 'cardstyle11') {
                $this->render_card_style_11();
            } 
            elseif ($card_layout === 'cardstyle12') {
                $this->render_card_style_12();
            }
            elseif ($card_layout === 'cardstyle21') {
                $this->render_card_style_21();
            } 
            elseif ($card_layout === 'cardstyle22') {
                $this->render_card_style_22();
            }elseif ($card_layout === 'cardstyle25') {
                $this->render_card_style_25();
            } 

            // Render Title layout
            if ($title_layout === 'titlestyle01') {
                $this->render_title_style_01();
            } elseif ($title_layout === 'titlestyle02') {
                $this->render_title_style_02();
            } elseif ($title_layout === 'titlestyle03') {
                $this->render_title_style_03();
            }elseif ($title_layout === 'titlestyle04') {
                $this->render_title_style_04();
            } elseif ($title_layout === 'titlestyle05') {
                $this->render_title_style_05();
            }elseif ($title_layout === 'titlestyle06') {
                $this->render_title_style_06();
            }
        }

        // Title Render
        protected function render_title_style_01() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/title-style/title-style-01.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Title Style 01 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_title_style_02() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/title-style/title-style-02.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Title Style 02 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_title_style_03() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/title-style/title-style-03.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Title Style 03 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_title_style_04() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/title-style/title-style-04.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Title Style 04 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_title_style_05() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/title-style/title-style-05.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Title Style 05 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_title_style_06() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/title-style/title-style-06.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Title Style 06 template not found.', 'fancy-post-grid') . '</div>';
            }
        }

        // Grid Render
        protected function render_grid_style_01() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style/grid-style-01.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Grid Style 01 template not found.', 'fancy-post-grid') . '</div>';
            }
        }

        protected function render_grid_style_02() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style/grid-style-02.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Grid Style 02 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_grid_style_03() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style/grid-style-03.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Grid Style 03 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_grid_style_04() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style/grid-style-04.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Grid Style 04 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_grid_style_05() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style/grid-style-05.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Grid Style 05 template not found.', 'fancy-post-grid') . '</div>';
            }
        }

        protected function render_grid_style_06() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style/grid-style-06.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Grid Style 06 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_grid_style_07() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style/grid-style-07.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Grid Style 07 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_grid_style_08() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style/grid-style-08.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Grid Style 08 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_grid_style_09() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style/grid-style-09.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Grid Style 09 template not found.', 'fancy-post-grid') . '</div>';
            }
        }

        protected function render_grid_style_10() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style/grid-style-10.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Grid Style 10 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_grid_style_11() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style/grid-style-11.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Grid Style 11 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_grid_style_12() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/grid-style/grid-style-12.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Grid Style 12 template not found.', 'fancy-post-grid') . '</div>';
            }
        }

        protected function render_slider_style_01() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/slider-style/slider-style-01.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Slider Style 01 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_slider_style_02() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/slider-style/slider-style-02.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Slider Style 02 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_slider_style_03() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/slider-style/slider-style-03.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Slider Style 03 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_slider_style_04() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/slider-style/slider-style-04.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Slider Style 04 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_slider_style_05() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/slider-style/slider-style-05.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Slider Style 05 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_slider_style_06() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/slider-style/slider-style-06.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Slider Style 06 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_slider_style_07() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/slider-style/slider-style-07.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Slider Style 07 template not found.', 'fancy-post-grid') . '</div>';
            }
        }

        protected function render_isotope_style_01() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/isotope-style/isotope-style-01.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Isotope Style 01 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_isotope_style_02() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/isotope-style/isotope-style-02.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Isotope Style 02 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_isotope_style_03() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/isotope-style/isotope-style-03.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Isotope Style 03 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_isotope_style_04() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/isotope-style/isotope-style-04.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Isotope Style 04 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_isotope_style_05() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/isotope-style/isotope-style-05.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Isotope Style 05 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_isotope_style_06() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/isotope-style/isotope-style-06.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Isotope Style 06 template not found.', 'fancy-post-grid') . '</div>';

            }
        }protected function render_isotope_style_07() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/isotope-style/isotope-style-07.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
               echo '<div class="error">' . esc_html__('Isotope Style 07 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_list_style_01() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/list-style/list-style-01.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('List Style 01 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_list_style_02() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/list-style/list-style-02.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('List Style 02 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_list_style_03() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/list-style/list-style-03.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('List Style 03 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_list_style_04() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/list-style/list-style-04.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('List Style 04 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_list_style_05() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/list-style/list-style-05.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('List Style 05 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_list_style_06() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/list-style/list-style-06.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('List Style 06 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_list_style_07() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/list-style/list-style-07.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('List Style 07 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_list_style_08() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/list-style/list-style-08.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('List Style 08 template not found.', 'fancy-post-grid') . '</div>';
            }
        } 
        // Card Style
        // Small Card
        protected function render_card_style_01() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-small-01.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Small Card Style 01 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_card_style_02() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-small-02.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Small Card Style 02 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_card_style_03() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-small-03.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Small Card Style 03 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_card_style_27() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-small-13.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Small Card Style 13 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_card_style_04() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-small-04.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Small Card Style 04 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_card_style_05() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-small-05.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Small Card Style 05 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_card_style_13() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-small-06.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Card Style 13 template not found.', 'fancy-post-grid') . '</div>';
            }
        }  
        protected function render_card_style_14() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-small-07.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Card Style 14 template not found.', 'fancy-post-grid') . '</div>';
            }
        }  
        protected function render_card_style_15() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-small-08.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Card Style 15 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_card_style_16() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-small-09.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Card Style 16 template not found.', 'fancy-post-grid') . '</div>';
            }
        }  
        protected function render_card_style_17() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-small-10.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Card Style 17 template not found.', 'fancy-post-grid') . '</div>';
            }
        }  
        protected function render_card_style_18() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-small-11.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Card Style 18 template not found.', 'fancy-post-grid') . '</div>';
            }
        } 
        protected function render_card_style_19() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-small-12.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Card Style 19 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        //Medium Card
        protected function render_card_style_06() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-medium-01.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Medium Card Style 01 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_card_style_07() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-medium-02.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Medium Card Style 02 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_card_style_26() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-medium-03.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Medium Card Style 03 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        // Overlay Card
        protected function render_card_style_08() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-overlay-01.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Overlay Card Style 01 template not found.', 'fancy-post-grid') . '</div>';
            }
        } 
        // Category Card
        protected function render_card_style_09() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-categories-01.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Category Card Style 09 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_card_style_20() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-categories-02.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Category Card Style 20 template not found.', 'fancy-post-grid') . '</div>';
            }
        } 
        // Trending Card
        protected function render_card_style_10() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-trending-01.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Trending Card Style 01 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_card_style_23() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-trending-02.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Trending Card Style 02 template not found.', 'fancy-post-grid') . '</div>';
            }
        }protected function render_card_style_24() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-trending-03.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Trending Card Style 03 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        // Video Card
        protected function render_card_style_11() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-video-01.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Video Card Style 01 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_card_style_12() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-video-02.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Video Card Style 02 template not found.', 'fancy-post-grid') . '</div>';
            }
        } 
        protected function render_card_style_21() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-video-03.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Video Card Style 03 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_card_style_22() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-video-04.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Video Card Style 04 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
        protected function render_card_style_25() {
            $file_path = plugin_dir_path( __FILE__ ) . 'render/card-style/card-style-video-05.php'; // Adjust the path as needed.
            
            if ( file_exists( $file_path ) ) {
                include $file_path;
            } else {
                echo '<div class="error">' . esc_html__('Video Card Style 05 template not found.', 'fancy-post-grid') . '</div>';
            }
        }
    }

    // FPG-Grid Layout Widget
    class Fancy_Post_Grid_Layout_Widget extends Fancy_Post_Grid_Base_Widget {
        protected $exclude_controls = ['fancy_post_title_layout','fancy_post_slider_layout','fancy_post_card_layout','fancy_post_list_layout','fancy_post_isotope_layout','slider_pagination_type','slider_section','slider_style','col_desktop_slider','col_lg_slider','col_md_slider','col_sm_slider','col_xs_slider','isotope_section','isotope_style','thumbnail_left_size','thumbnail_right_size','meta_date_color','title_content','section_title','post_section_title_style'];
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
        protected $exclude_controls = ['fancy_post_title_layout','fancy_post_grid_layout','fancy_post_card_layout', 'fancy_post_list_layout','fancy_post_isotope_layout','columns','show_pagination','col_desktop','col_lg','col_md','col_sm','col_xs','isotope_section','isotope_style','thumbnail_left_size','thumbnail_right_size','meta_date_color','title_content','section_title','post_section_title_style'];
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
        protected $exclude_controls = ['fancy_post_title_layout','fancy_post_grid_layout','fancy_post_card_layout','show_pagination_on', 'fancy_post_slider_layout','fancy_post_list_layout','slider_columns','slider_pagination_type','slider_section','slider_style','col_desktop_slider','col_lg_slider','col_md_slider','col_sm_slider','col_xs_slider','thumbnail_left_size','thumbnail_right_size','meta_date_color','title_content','section_title','post_section_title_style'];
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
        protected $exclude_controls = ['fancy_post_title_layout','fancy_post_grid_layout','fancy_post_card_layout','show_pagination_on', 'fancy_post_slider_layout','fancy_post_isotope_layout','slider_columns','slider_pagination_type','slider_section','slider_style','col_desktop_slider','col_lg_slider','col_md_slider','col_sm_slider','col_xs_slider','isotope_section','isotope_style','col_desktop','col_lg','col_md','col_sm','col_xs','space_between','space_between_lg','space_between_md','space_between_sm','space_between_xs','title_content','section_title','post_section_title_style'];
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
    // FPG-Card Layout Widget
    class Fancy_Post_Card_Layout_Widget extends Fancy_Post_Grid_Base_Widget {
        
        // Specify which controls to exclude
        protected $exclude_controls = ['fancy_post_title_layout','fancy_post_grid_layout','fancy_post_list_layout','show_pagination_on', 'fancy_post_slider_layout', 'excerpt_content','fancy_post_isotope_layout','slider_columns','slider_pagination_type','slider_section','slider_style','col_desktop_slider','col_lg_slider','col_md_slider','col_sm_slider','col_xs_slider','isotope_section','isotope_style','col_desktop','col_lg','col_md','col_sm','col_xs','space_between','space_between_lg','space_between_md','space_between_sm','space_between_xs','read_more_content','read_more_style','show_post_excerpt','show_post_readmore','excerpt_content_style','show_post_tags','show_comments_count','show_post_tags_icon','show_comments_count_icon','excerpt_order','button_order','thumbnail_left_size','thumbnail_right_size','thumbnail_size','title_content','section_title','post_section_title_style','show_post_date','show_post_categories','show_post_date_icon','show_post_categories_icon'];
        public function get_name() {
            return 'fpg_card_layout';
        }

        public function get_title() {
            return __('FPG - Card Layout', 'fancy-post-grid');
        }

        public function get_icon() {
            return 'eicon-post-list';
        }

        public function get_categories() {
            return array('fancy-post-grid-category');
        }
        
    }

    // FPG-Card Layout Widget
    class Fancy_Post_Title_Layout_Widget extends Fancy_Post_Grid_Base_Widget {
        
        // Specify which controls to exclude
        protected $exclude_controls = ['fancy_post_grid_layout','fancy_post_list_layout','show_pagination_on', 'fancy_post_slider_layout', 'excerpt_content','fancy_post_isotope_layout','slider_columns','slider_pagination_type','slider_section','slider_style','col_desktop_slider','col_lg_slider','col_md_slider','col_sm_slider','col_xs_slider','isotope_section','isotope_style','col_desktop','col_lg','col_md','col_sm','col_xs','space_between','space_between_lg','space_between_md','space_between_sm','space_between_xs','read_more_content','read_more_style','show_post_excerpt','show_post_readmore','excerpt_content_style','show_post_tags','show_comments_count','show_post_tags_icon','show_comments_count_icon','excerpt_order','button_order','thumbnail_left_size','thumbnail_right_size','thumbnail_size','fancy_post_card_layout','link_section','show_pagination_on','query_builder_section','style_settings','item_order','thumbnail','meta_data_content','meta_data_style','excerpt_content_style','thumbnail_style','post_content_box','card_post_item_style','section_style_style','post_title_style','post_title'];
        public function get_name() {
            return 'fpg_title_layout';
        }

        public function get_title() {
            return __('FPG - Section Title Layout', 'fancy-post-grid');
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
    \Elementor\Plugin::instance()->widgets_manager->register_widget_type(new Fancy_Post_Card_Layout_Widget());
    \Elementor\Plugin::instance()->widgets_manager->register_widget_type(new Fancy_Post_Title_Layout_Widget());
});