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
                    'label' => __( 'Settings', 'fancy-post-grid' ),
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
                'show_post_date',
                array(
                    'label'   => __( 'Show Post Date', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'date_on'  => __( 'Show', 'fancy-post-grid' ),
                    'date_off' => __( 'Hide', 'fancy-post-grid' ),
                    'default'   => 'date_on',
                )
            );

            $this->add_control(
                'show_post_author',
                array(
                    'label'   => __( 'Show Post Author', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'author_on'  => __( 'Show', 'fancy-post-grid' ),
                    'author_off' => __( 'Hide', 'fancy-post-grid' ),
                    'default'   => 'author_on',
                )
            );

            $this->add_control(
                'show_post_categories',
                array(
                    'label'   => __( 'Show Post Categories', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'categories_on'  => __( 'Show', 'fancy-post-grid' ),
                    'categories_off' => __( 'Hide', 'fancy-post-grid' ),
                    'default'   => 'categories_on',
                )
            );

            $this->add_control(
                'show_post_tags',
                array(
                    'label'   => __( 'Show Post Tags', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'tags_on'  => __( 'Show', 'fancy-post-grid' ),
                    'tags_off' => __( 'Hide', 'fancy-post-grid' ),
                    'default'   => 'tags_on',
                )
            );

            $this->add_control(
                'show_comments_count',
                array(
                    'label'   => __( 'Show Comments Count', 'fancy-post-grid' ),
                    'type'    => \Elementor\Controls_Manager::SWITCHER,
                    'comments_on'  => __( 'Show', 'fancy-post-grid' ),
                    'comments_off' => __( 'Hide', 'fancy-post-grid' ),
                    'default'   => 'comments_on',
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
                    ),
                    'default' => 'medium',
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
                                <a href="<?php the_permalink(); ?>">
                                    <?php the_post_thumbnail('medium'); // You can change the size here ?>
                                </a>
                            </div>
                        <?php } ?>

                        <!-- Post Meta: Date, Author, Category, Tags, Comments -->
                        <div class="fancy-post-meta">
                            <?php if ('yes' === $settings['show_post_date']) { ?>
                                <span class="post-date"><?php echo esc_html(get_the_date()); ?></span>
                            <?php } ?>

                            <?php if ('yes' === $settings['show_post_author']) { ?>
                                <span class="post-author"><?php _e('By', 'fancy-post-grid'); ?> <?php the_author(); ?></span>
                            <?php } ?>

                            <?php if ('yes' === $settings['show_post_categories']) { ?>
                                <span class="post-categories"><?php echo get_the_category_list(', '); ?></span>
                            <?php } ?>

                            <?php if ('yes' === $settings['show_post_tags']) { ?>
                                <span class="post-tags"><?php echo get_the_tag_list('', ', '); ?></span>
                            <?php } ?>

                            <?php if ('yes' === $settings['show_comments_count']) { ?>
                                <span class="post-comments">
                                    <a href="<?php comments_link(); ?>"><?php comments_number(__('0 Comments', 'fancy-post-grid'), __('1 Comment', 'fancy-post-grid'), __('% Comments', 'fancy-post-grid')); ?></a>
                                </span>
                            <?php } ?>
                        </div>

                        <!-- Post Title -->
                        <?php if ('yes' === $settings['show_post_title']) { ?>
                            <h3 class="fancy-post-title">
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </h3>
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
                                <a href="<?php the_permalink(); ?>" class="readmore-button"><?php _e('Read More', 'fancy-post-grid'); ?></a>
                            </div>
                        <?php } ?>
                        
                    </div>
                    <?php
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
