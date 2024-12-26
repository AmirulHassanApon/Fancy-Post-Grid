<?php
add_action('elementor/elements/categories_registered', function ($elements_manager) {
    $elements_manager->add_category(
        'fancy-post-grid-category',
        array(
            'title' => __('Fancy Post Grid', 'fancy-post-grid'),
            'icon'  => 'fa fa-th', // Optional icon for the category
        ),
        0 // Priority set to 0 to place it at the top
    );
});

add_action('elementor/widgets/widgets_registered', function () {
    // Base class for all Fancy Post Grid Layout Widgets
    abstract class Fancy_Post_Grid_Base_Widget extends \Elementor\Widget_Base {
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
            $authors = get_users(array('who' => 'authors'));
            $author_list = [];
            foreach ($authors as $author) {
                $author_list[$author->ID] = $author->display_name;
            }
            return $author_list;
        }

        protected function register_controls() {
            // Layout Section
            $this->start_controls_section(
                'layout_section',
                array(
                    'label' => __( 'Layout', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
                )
            );

            // Add control for Layout selection (Grid, Slider, etc.)
            $this->add_control(
                'fancy_post_grid_layout',
                array(
                    'label'   => __( 'Grid Style', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'gridstyle01' => __( 'Grid Style 01', 'fancy-post-grid' ),
                        'gridstyle02' => __( 'Grid Style 02', 'fancy-post-grid' ),
                        'gridstyle03' => __( 'Grid Style 03', 'fancy-post-grid' ),
                        'gridstyle04' => __( 'Grid Style 04', 'fancy-post-grid' ),
                    ),
                    'default' => 'gridstyle01',
                )
            );


            // Add control for number of columns
            $this->add_control(
                'columns',
                array(
                    'label'   => __( 'Number of Columns', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        1 => __( '1 Column', 'fancy-post-grid' ),
                        2 => __( '2 Columns', 'fancy-post-grid' ),
                        3 => __( '3 Columns', 'fancy-post-grid' ),
                        4 => __( '4 Columns', 'fancy-post-grid' ),
                        6 => __( '6 Columns', 'fancy-post-grid' ),
                    ),
                    'default' => 3,
                )
            );

            // Add control for text alignment
            $this->add_control(
                'text_alignment',
                array(
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
                )
            );

            $this->end_controls_section();
            // Layout Section
            $this->start_controls_section(
                'query_builder_section',
                array(
                    'label' => __( 'Query Builder', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
                )
            );
            // Add Query Builder options
            $this->add_control(
                'category_filter',
                array(
                    'label'   => __( 'Select Category', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT2,
                    'options' => $this->get_categories_list(),
                    'label_block' => true,
                    'multiple' => true,
                )
            );

            $this->add_control(
                'tag_filter',
                array(
                    'label'   => __( 'Select Tags', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT2,
                    'options' => $this->get_tags_list(),
                    'label_block' => true,
                    'multiple' => true,
                )
            );

            $this->add_control(
                'author_filter',
                array(
                    'label'   => __( 'Select Author', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT2,
                    'options' => $this->get_authors_list(),
                    'label_block' => true,
                )
            );

            // Sorting options
            $this->add_control(
                'sort_order',
                array(
                    'label'   => __( 'Sort Order', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'desc' => __( 'Descending', 'fancy-post-grid' ),
                        'asc'  => __( 'Ascending', 'fancy-post-grid' ),
                    ),
                    'default' => 'desc',
                )
            );

            // Number of posts per page
            $this->add_control(
                'posts_per_page',
                array(
                    'label'       => __( 'Posts per Page', 'fancy-post-grid' ),
                    'type'        => \Elementor\Controls_Manager::NUMBER,
                    'default'     => 6,
                    'min'         => 1,
                    'step'        => 1,
                )
            );

            // Include/Exclude posts
            $this->add_control(
                'include_posts',
                array(
                    'label'   => __( 'Include Posts (IDs)', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::TEXT,
                    'description' => __( 'Enter post IDs separated by commas', 'fancy-post-grid' ),
                )
            );

            $this->add_control(
                'exclude_posts',
                array(
                    'label'   => __( 'Exclude Posts (IDs)', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::TEXT,
                    'description' => __( 'Enter post IDs separated by commas', 'fancy-post-grid' ),
                )
            );

            $this->end_controls_section();
            // Pagination Section
            $this->start_controls_section(
                'pagination_section',
                array(
                    'label' => __( 'Pagination', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
                )
            );
            $this->add_control(
                'show_pagination',
                array(
                    'label'       => __( 'Show Pagination', 'fancy-post-grid' ),
                    'type'        => \Elementor\Controls_Manager::SWITCHER,
                    'pagination_on'    => __( 'Show', 'fancy-post-grid' ),
                    'pagination_off'   => __( 'Hide', 'fancy-post-grid' ),
                    'default'     => 'pagination_on',
                )
            );
            $this->end_controls_section();

            // Links Section
            $this->start_controls_section(
                'link_section',
                array(
                    'label' => __( 'Links', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
                )
            );
            $this->add_control(
                'link_type',
                array(
                    'label'   => __( 'Post link type', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'link_details' => __( 'Link to details page', 'fancy-post-grid' ),
                        'no_link'  => __( 'No Link', 'fancy-post-grid' ),
                    ),
                    'default' => 'link_details',
                )
            );
            $this->add_control(
                'link_target',
                array(
                    'label'   => __( 'Link Target', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'same_window' => __( 'Same Window', 'fancy-post-grid' ),
                        'new_window'  => __( 'New Window', 'fancy-post-grid' ),
                    ),
                    'default' => 'same_window',
                )
            );
            $this->add_control(
                'thumbnail_link',
                array(
                    'label'       => __( 'Thumbnail Link', 'fancy-post-grid' ),
                    'type'        => \Elementor\Controls_Manager::SWITCHER,
                    'thumbnail_on'    => __( 'Show', 'fancy-post-grid' ),
                    'thumbnail_off'   => __( 'Hide', 'fancy-post-grid' ),
                    'default'     => 'thumbnail_on',
                )
            );
            $this->end_controls_section();
            // Style Section
            $this->start_controls_section(
                'style_settings',
                array(
                    'label' => __( ' Field Selection', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_SETTINGS,
                )
            );
            // Show/Hide controls for Post Elements
            $this->add_control(
                'show_post_title',
                array(
                    'label'   => __( 'Show Post Title', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'title_on'  => __( 'Show', 'fancy-post-grid' ),
                    'title_off' => __( 'Hide', 'fancy-post-grid' ),
                    'default'   => 'title_on',
                )
            );

            $this->add_control(
                'show_post_thumbnail',
                array(
                    'label'   => __( 'Show Thumbnail', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'thumbnail_on'  => __( 'Show', 'fancy-post-grid' ),
                    'thumbnail_off' => __( 'Hide', 'fancy-post-grid' ),
                    'default'   => 'thumbnail_on',
                )
            );

            
            $this->add_control(
                'show_post_excerpt',
                array(
                    'label'       => __( 'Show Post Excerpt', 'fancy-post-grid' ),
                    'type'        => \Elementor\Controls_Manager::SWITCHER,
                    'excerpt_on'    => __( 'Show', 'fancy-post-grid' ),
                    'excerpt_off'   => __( 'Hide', 'fancy-post-grid' ),
                    'default'     => 'excerpt_on',
                )
            );

            $this->add_control(
                'show_post_readmore',
                array(
                    'label'       => __( 'Show Read More Button', 'fancy-post-grid' ),
                    'type'        => \Elementor\Controls_Manager::SWITCHER,
                    'button_on'    => __( 'Show', 'fancy-post-grid' ),
                    'button_off'   => __( 'Hide', 'fancy-post-grid' ),
                    'default'     => 'button_on',
                )
            );
            $this->add_control(
                'show_meta_data',
                array(
                    'label'   => __( 'Meta Data', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'metadata_on'  => __( 'Show', 'fancy-post-grid' ),
                    'metadata_off' => __( 'Hide', 'fancy-post-grid' ),
                    'default'   => 'metadata_on',
                )
            );

            $this->add_control(
                'show_post_date',
                array(
                    'label'   => __( '- Show Post Date', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'date_on'  => __( 'Show', 'fancy-post-grid' ),
                    'date_off' => __( 'Hide', 'fancy-post-grid' ),
                    'default'   => 'date_on',
                )
            );

            $this->add_control(
                'show_post_author',
                array(
                    'label'   => __( '- Show Post Author', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'author_on'  => __( 'Show', 'fancy-post-grid' ),
                    'author_off' => __( 'Hide', 'fancy-post-grid' ),
                    'default'   => 'author_on',
                )
            );

            $this->add_control(
                'show_post_categories',
                array(
                    'label'   => __( '- Show Post Categories', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'categories_on'  => __( 'Show', 'fancy-post-grid' ),
                    'categories_off' => __( 'Hide', 'fancy-post-grid' ),
                    'default'   => 'categories_on',
                )
            );

            $this->add_control(
                'show_post_tags',
                array(
                    'label'   => __( '- Show Post Tags', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'tags_on'  => __( 'Show', 'fancy-post-grid' ),
                    'tags_off' => __( 'Hide', 'fancy-post-grid' ),
                    'default'   => 'tags_on',
                )
            );

            $this->add_control(
                'show_comments_count',
                array(
                    'label'   => __( '- Show Comments Count', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'comments_on'  => __( 'Show', 'fancy-post-grid' ),
                    'comments_off' => __( 'Hide', 'fancy-post-grid' ),
                    'default'   => 'comments_on',
                )
            );
            $this->add_control(
                'show_meta_data_icon',
                array(
                    'label'   => __( 'Meta Icon', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'metadata_on'  => __( 'Show', 'fancy-post-grid' ),
                    'metadata_off' => __( 'Hide', 'fancy-post-grid' ),
                    'default'   => 'metadata_on',
                )
            );

            $this->add_control(
                'show_post_date_icon',
                array(
                    'label'   => __( '- Show Post Date  Icon ', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'date_on'  => __( 'Show', 'fancy-post-grid' ),
                    'date_off' => __( 'Hide', 'fancy-post-grid' ),
                    'default'   => 'date_on',
                )
            );

            $this->add_control(
                'show_post_author_icon',
                array(
                    'label'   => __( '- Show Post Author  Icon', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'author_on'  => __( 'Show', 'fancy-post-grid' ),
                    'author_off' => __( 'Hide', 'fancy-post-grid' ),
                    'default'   => 'author_on',
                )
            );

            $this->add_control(
                'show_post_categories_icon',
                array(
                    'label'   => __( '- Show Post Categories Icon', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'categories_on'  => __( 'Show', 'fancy-post-grid' ),
                    'categories_off' => __( 'Hide', 'fancy-post-grid' ),
                    'default'   => 'categories_on',
                )
            );

            $this->add_control(
                'show_post_tags_icon',
                array(
                    'label'   => __( '- Show Post Tags Icon', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'tags_on'  => __( 'Show', 'fancy-post-grid' ),
                    'tags_off' => __( 'Hide', 'fancy-post-grid' ),
                    'default'   => 'tags_on',
                )
            );

            $this->add_control(
                'show_comments_count_icon',
                array(
                    'label'   => __( '- Show Comments Count Icon', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'comments_on'  => __( 'Show', 'fancy-post-grid' ),
                    'comments_off' => __( 'Hide', 'fancy-post-grid' ),
                    'default'   => 'comments_on',
                )
            );

            $this->add_control(
                'show_post_social_share',
                array(
                    'label'       => __( 'Show Social Share', 'fancy-post-grid' ),
                    'type'        => \Elementor\Controls_Manager::SWITCHER,
                    'social_on'    => __( 'Show', 'fancy-post-grid' ),
                    'social_off'   => __( 'Hide', 'fancy-post-grid' ),
                    'default'     => 'social_on',
                )
            );
            $this->end_controls_section();
            // Post Title
            $this->start_controls_section(
                'post_title',
                array(
                    'label' => __( ' Post Title', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_SETTINGS,
                )
            );
            $this->add_control(
                'title_tag',
                array(
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
                )
            );
            // Show/Hide Title Hover Underline
            $this->add_control(
                'title_hover_underline',
                array(
                    'label'   => __( 'Title Hover Underline', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'enable' => __( 'Enable', 'fancy-post-grid' ),
                        'disable'  => __( 'Disable', 'fancy-post-grid' ),
                    ),
                    'default' => 'enable',
                )
            );
            // Title Visibility Style
            $this->add_control(
                'title_visibility_style',
                array(
                    'label'   => __( 'Title Visibility Style', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'default' => __( 'Default', 'fancy-post-grid' ),
                        'show_1_line' => __( 'Show in 1 Line', 'fancy-post-grid' ),
                        'show_2_lines' => __( 'Show in 2 Lines', 'fancy-post-grid' ),
                        'show_3_lines' => __( 'Show in 3 Lines', 'fancy-post-grid' ),
                    ),
                    'default' => 'default',
                )
            );

            // Title Crop By
            $this->add_control(
                'title_crop_by',
                array(
                    'label'   => __( 'Title Crop By', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'character' => __( 'Character', 'fancy-post-grid' ),
                        'word' => __( 'Word', 'fancy-post-grid' ),
                    ),
                    'default' => 'character',
                )
            );

            // Title Length
            $this->add_control(
                'title_length',
                array(
                    'label'   => __( 'Title Length', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::NUMBER,
                    'default' => 50,
                    'min'     => 1,
                )
            );

            $this->end_controls_section();
            // Thumbnail Section
            $this->start_controls_section(
                'thumbnail',
                array(
                    'label' => __( ' Thumbnail', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_SETTINGS,
                )
            );
            // Thumbnail Styling
            $this->add_control(
                'thumbnail_size',
                array(
                    'label'   => __( 'Thumbnail Size', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'thumbnail'  => __( 'Thumbnail', 'fancy-post-grid' ),
                        'medium'     => __( 'Medium', 'fancy-post-grid' ),
                        'large'      => __( 'Large', 'fancy-post-grid' ),
                        'full'       => __( 'Full', 'fancy-post-grid' ),
                        'fancy_post_custom_size'  => __( 'Custom Size (768x500)', 'fancy-post-grid' ),
                        'fancy_post_square'     => __( 'Square(500x500)', 'fancy-post-grid' ),
                        'fancy_post_landscape'      => __( 'Landscape(834x550)', 'fancy-post-grid' ),
                        'fancy_post_portrait'       => __( 'Portrait(421x550)', 'fancy-post-grid' ),
                        'fancy_post_list'       => __( 'List Size(1200 x 650)', 'fancy-post-grid' ),

                    ),
                    'default' => 'full',
                )
            );

            $this->end_controls_section();

            // Excerpt / Content Section
            $this->start_controls_section(
                'excerpt_content',
                array(
                    'label' => __( ' Excerpt / Content', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_SETTINGS,
                )
            );
            // Excerpt Type
            $this->add_control(
                'excerpt_type',
                array(
                    'label'   => __( 'Excerpt Type', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'character' => __( 'Character', 'fancy-post-grid' ),
                        'word' => __( 'Word', 'fancy-post-grid' ),
                        'full_content' => __( 'Full Content', 'fancy-post-grid' ),
                    ),
                    'default' => 'character',
                )
            );
            // Excerpt Limit
            $this->add_control(
                'excerpt_length',
                array(
                    'label'   => __( 'Excerpt Limit', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::NUMBER,
                    'default' => 200,
                    'min'     => 1,
                )
            );
            // Excerpt Limit
            $this->add_control(
                'expansion_indicator',
                array(
                    'label'   => __( 'Expansion Indicator', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::TEXT,
                    'default' => '...',    
                )
            );

            $this->end_controls_section();

            // Style Section
            $this->start_controls_section(
                'style_section',
                array(
                    'label' => __( 'Style', 'fancy-post-grid' ),
                    'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
                )
            );

            // Title Styling
            $this->add_control(
                'title_color',
                array(
                    'label'     => __( 'Title Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-title' => 'color: {{VALUE}};',
                    ),
                )
            );

            $this->add_control(
                'title_margin',
                array(
                    'label'     => __( 'Title Margin', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::DIMENSIONS,
                    'selectors' => array(
                        '{{WRAPPER}} .fancy-post-title' => 'margin: {{TOP}} {{RIGHT}} {{BOTTOM}} {{LEFT}};',
                    ),
                )
            );

            // Thumbnail Styling
            $this->add_control(
                'thumbnail_size',
                array(
                    'label'   => __( 'Thumbnail Size', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SELECT,
                    'options' => array(
                        'thumbnail'  => __( 'Thumbnail', 'fancy-post-grid' ),
                        'medium'     => __( 'Medium', 'fancy-post-grid' ),
                        'large'      => __( 'Large', 'fancy-post-grid' ),
                        'full'       => __( 'Full', 'fancy-post-grid' ),
                        'fancy_post_custom_size'  => __( 'Custom Size (768x500)', 'fancy-post-grid' ),
                        'fancy_post_square'     => __( 'Square(500x500)', 'fancy-post-grid' ),
                        'fancy_post_landscape'      => __( 'Landscape(834x550)', 'fancy-post-grid' ),
                        'fancy_post_portrait'       => __( 'Portrait(421x550)', 'fancy-post-grid' ),
                        'fancy_post_list'       => __( 'List Size(1200 x 650)', 'fancy-post-grid' ),

                    ),
                    'default' => 'full',
                )
            );

            // Read More Button Styling
            $this->add_control(
                'readmore_button_color',
                array(
                    'label'     => __( 'Read More Button Color', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::COLOR,
                    'selectors' => array(
                        '{{WRAPPER}} .readmore-button' => 'background-color: {{VALUE}};',
                    ),
                )
            );

            $this->add_control(
                'readmore_button_padding',
                array(
                    'label'     => __( 'Read More Button Padding', 'fancy-post-grid' ),
                    'type'      => \Elementor\Controls_Manager::DIMENSIONS,
                    'selectors' => array(
                        '{{WRAPPER}} .readmore-button' => 'padding: {{TOP}} {{RIGHT}} {{BOTTOM}} {{LEFT}};',
                    ),
                )
            );

            $this->end_controls_section(); // End style section
        }

        protected function render() {
            $settings = $this->get_settings_for_display();
            // Get the current page number
            $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
            // Prepare arguments for WP_Query
            $args = array(
                'post_type'      => 'post',
                'post_status'    => 'publish',
                'posts_per_page' => $settings['posts_per_page'],
                'orderby'        => 'date',
                'order'          => $settings['sort_order'],
                'category__in'   => !empty($settings['category_filter']) ? $settings['category_filter'] : '',
                'tag__in'        => !empty($settings['tag_filter']) ? $settings['tag_filter'] : '',
                'author'         => !empty($settings['author_filter']) ? $settings['author_filter'] : '',
                'post__in'       => !empty($settings['include_posts']) ? explode(',', $settings['include_posts']) : '',
                'post__not_in'   => !empty($settings['exclude_posts']) ? explode(',', $settings['exclude_posts']) : '',
                'paged'          => $paged, // Add the paged parameter to handle pagination
            );

            // Query the posts
            $query = new \WP_Query($args);

            // Check if there are posts
            if ($query->have_posts()) {
                echo '<div class="fancy-post-grid" style="display: grid; grid-template-columns: repeat(' . esc_attr($settings['columns']) . ', 1fr);">';
                
                while ($query->have_posts()) {
                    $query->the_post();

                    ?>
                    <div class="fancy-post-item" style="text-align: <?php echo esc_attr($settings['text_alignment']); ?>;">

                        <!-- Featured Image -->
                        <?php if ('yes' === $settings['show_post_thumbnail'] && has_post_thumbnail()) { ?>
                            <div class="fancy-post-image">
                                <?php 
                                // Map the custom sizes to their actual dimensions
                                $thumbnail_size = $settings['thumbnail_size'];

                                if ($thumbnail_size === 'fancy_post_custom_size') {
                                    $thumbnail_size = array(768, 500); // Custom size
                                } elseif ($thumbnail_size === 'fancy_post_square') {
                                    $thumbnail_size = array(500, 500); // Square size
                                } elseif ($thumbnail_size === 'fancy_post_landscape') {
                                    $thumbnail_size = array(834, 550); // Landscape size
                                } elseif ($thumbnail_size === 'fancy_post_portrait') {
                                    $thumbnail_size = array(421, 550); // Portrait size
                                } elseif ($thumbnail_size === 'fancy_post_list') {
                                    $thumbnail_size = array(1200, 650); // List size
                                } // Other sizes like 'thumbnail', 'medium', 'large', 'full' are supported natively

                                if ('thumbnail_on' === $settings['thumbnail_link']) { ?>
                                    <a href="<?php the_permalink(); ?>" target="<?php echo ('new_window' === $settings['link_target']) ? '_blank' : '_self'; ?>">
                                        <?php the_post_thumbnail($thumbnail_size); ?>
                                    </a>
                                <?php } else { ?>
                                    <?php the_post_thumbnail($thumbnail_size); ?>
                                <?php } ?>
                            </div>
                        <?php } ?>



                        <!-- Post Meta: Date, Author, Category, Tags, Comments -->
                        <?php if ('yes' === $settings['show_meta_data']) { ?>
                        <div class="fancy-post-meta">
                            <?php if ('yes' === $settings['show_post_date']) { ?>
                                <span class="post-date">
                                    <?php if ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['show_post_date_icon']) { ?>
                                    <i class="fas fa-calendar-alt"></i> <!-- Calendar icon for the date -->
                                    <?php } ?>
                                    <?php echo esc_html(get_the_date()); ?>
                                </span>
                            <?php } ?>

                            <?php if ('yes' === $settings['show_post_author']) { ?>
                                <span class="post-author">
                                    
                                    <?php if ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['show_post_author_icon']) { ?>    
                                    <i class="fas fa-user"></i> <!-- User icon for the author -->
                                    <?php } ?>
                                    <?php _e('By', 'fancy-post-grid'); ?> <?php the_author(); ?>
                                </span>
                            <?php } ?>

                            <?php if ('yes' === $settings['show_post_categories']) { ?>
                                <span class="post-categories">
                                    <?php if ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['show_post_categories_icon']) { ?>
                                    <i class="fas fa-folder"></i> <!-- Folder icon for categories -->
                                    <?php } ?>
                                    <?php echo get_the_category_list(', '); ?>
                                </span>
                            <?php } ?>

                            <?php if ('yes' === $settings['show_post_tags']) { ?>
                                <span class="post-tags">
                                    <?php if ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['show_post_tags_icon']) { ?>
                                    <i class="fas fa-tags"></i> <!-- Tags icon for tags -->
                                    <?php } ?>
                                    <?php echo get_the_tag_list('', ', '); ?>
                                </span>
                            <?php } ?>

                            <?php if ('yes' === $settings['show_comments_count']) { ?>
                                <span class="post-comments">
                                    <?php if ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['show_comments_count_icon']) { ?>
                                    <i class="fas fa-comments"></i> <!-- Comment bubble icon -->
                                    <?php } ?>
                                    <a href="<?php comments_link(); ?>">
                                        <?php comments_number(__('0 Comments', 'fancy-post-grid'), __('1 Comment', 'fancy-post-grid'), __('% Comments', 'fancy-post-grid')); ?>
                                    </a>
                                </span>
                            <?php } ?>
                        </div>
                        <?php } ?>

                        <!-- Post Title -->
                        <?php if ('yes' === $settings['show_post_title']) { 
                            // Set the dynamic title tag
                            $title_tag = !empty($settings['title_tag']) ? $settings['title_tag'] : 'h3';

                            // Retrieve the title and apply cropping
                            $title = get_the_title();
                            if (!empty($settings['title_crop_by']) && !empty($settings['title_length'])) {
                                if ('character' === $settings['title_crop_by']) {
                                    $title = mb_substr($title, 0, $settings['title_length']);
                                } elseif ('word' === $settings['title_crop_by']) {
                                    $words = explode(' ', $title);
                                    $title = implode(' ', array_slice($words, 0, $settings['title_length']));
                                }
                            }

                            // Add visibility styling
                            $visibility_class = '';
                            if ('show_1_line' === $settings['title_visibility_style']) {
                                $visibility_class = 'fancy-title-one-line';
                            } elseif ('show_2_lines' === $settings['title_visibility_style']) {
                                $visibility_class = 'fancy-title-two-lines';
                            } elseif ('show_3_lines' === $settings['title_visibility_style']) {
                                $visibility_class = 'fancy-title-three-lines';
                            }

                            // Check if hover underline is enabled
                            $hover_class = ('enable' === $settings['title_hover_underline']) ? 'hover-underline' : '';
                            ?>
                            <<?php echo esc_attr($title_tag); ?> class="fancy-post-title <?php echo esc_attr($visibility_class . ' ' . $hover_class); ?>">
                                <?php if ('link_details' === $settings['link_type']) { ?>
                                    <a href="<?php the_permalink(); ?>" target="<?php echo ('new_window' === $settings['link_target']) ? '_blank' : '_self'; ?>">
                                        <?php echo esc_html($title); ?>
                                    </a>
                                <?php } else { ?>
                                    <?php echo esc_html($title); ?>
                                <?php } ?>
                            </<?php echo esc_attr($title_tag); ?>>
                        <?php } ?>



                        <!-- Post Excerpt -->
                        <?php if ('yes' === $settings['show_post_excerpt']) { ?>
                            <p class="fancy-post-excerpt">
                                <?php echo wp_trim_words(get_the_excerpt(), 20); // Adjust word count as needed ?>
                            </p>
                        <?php } ?>

                        <!-- Read More Button -->
                        <?php if ('yes' === $settings['show_post_readmore']) { ?>
                            <div class="fancy-post-readmore">
                                <?php if ('link_details' === $settings['link_type']) { ?>
                                    <a href="<?php the_permalink(); ?>" class="readmore-button" target="<?php echo ('new_window' === $settings['link_target']) ? '_blank' : '_self'; ?>">
                                        <?php _e('Read More', 'fancy-post-grid'); ?>
                                    </a>
                                <?php } ?>
                            </div>
                        <?php } ?>

                        
                    </div>
                    <?php
                }
                // Pagination
                if ('yes' === $settings['show_pagination']) {
                    echo '<div class="fancy-post-pagination">';
                    $big = 999999999; // Need an unlikely integer for pagination
                    echo paginate_links(array(
                        'base'      => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
                        'format'    => '?paged=%#%',
                        'current'   => max(1, $paged),
                        'total'     => $query->max_num_pages,
                        'prev_text' => __('« Prev', 'fancy-post-grid'),
                        'next_text' => __('Next »', 'fancy-post-grid'),
                    ));
                    echo '</div>';
                }
                echo '</div>';
            } else {
                echo '<p>' . __('No posts found.', 'fancy-post-grid') . '</p>';
            }

            // Reset post data
            wp_reset_postdata();
        }
    }

    // FPG-Grid Layout Widget
    class Fancy_Post_Grid_Layout_Widget extends Fancy_Post_Grid_Base_Widget {
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

    // Register all widgets
    \Elementor\Plugin::instance()->widgets_manager->register_widget_type(new Fancy_Post_Grid_Layout_Widget());
});
