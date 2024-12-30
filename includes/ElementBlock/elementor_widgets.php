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
            $authors = get_users(array('capability' => 'edit_posts',));
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
                [                    'label'   => __( 'Grid Style', 'fancy-post-grid' ),
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


            // Add control for number of columns
            $this->add_control(
                'columns',
                [                    
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
            $this->end_controls_section();

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
                        'default_style' => __( 'Default From Style', 'fancy-post-grid' ),
                        'text_button' => __( 'Only Text Button', 'fancy-post-grid' ),
                    ),
                    'default' => 'default_style',
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
                ]
            );

            // Enable Border & Box Shadow
            $this->add_control(
                'enable_border_shadow',
                [
                    'label'   => __( 'Enable Border & Box Shadow', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'default' => '',
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
                ]
            );

            // Enable Border Bottom
            $this->add_control(
                'enable_border_bottom',
                [
                    'label'   => __( 'Enable Border Bottom', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'default' => '',
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
                ]
            );

            $this->end_controls_tab();

            $this->end_controls_tabs();

            $this->end_controls_section();
        }
        protected function render() {
            $settings = $this->get_settings_for_display();

            switch ( $settings['fancy_post_grid_layout'] ) {
                case 'gridstyle01':
                    $this->render_grid_style_01();
                    break;

                case 'gridstyle02':
                    $this->render_grid_style_02();
                    break;

                case 'gridstyle03':
                    $this->render_grid_style_03();
                    break;

                case 'gridstyle04':
                    $this->render_grid_style_04();
                    break;

                case 'gridstyle05':
                    $this->render_grid_style_05();
                    break;

                case 'gridstyle06':
                    $this->render_grid_style_06();
                    break;

                case 'gridstyle07':
                    $this->render_grid_style_07();
                    break;

                case 'gridstyle08':
                    $this->render_grid_style_08();
                    break;

                case 'gridstyle09':
                    $this->render_grid_style_09();
                    break;

                case 'gridstyle10':
                    $this->render_grid_style_10();
                    break;

                case 'gridstyle11':
                    $this->render_grid_style_11();
                    break;

                case 'gridstyle12':
                    $this->render_grid_style_12();
                    break;

                default:
                    $this->render_grid_style_01();
                    break;
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
