<?php

/**
 * Logo widget class
 *
 */

use Elementor\Repeater;
use Elementor\Utils;
use Elementor\Control_Media;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Text_Stroke;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Background;
use Elementor\Group_Control_Image_Size;
use Elementor\POPOVER_TOGGLE;
use Elementor\Icons_Manager;

defined('ABSPATH') || die();

class Rsaddon_Elementor_pro_Hero_Slider_Widget extends \Elementor\Widget_Base
{
    /**
     * Get widget name.
     *
     * Retrieve rsgallery widget name.
     *
     * @since 1.0.0
     * @access public
     *
     * @return string Widget name.
     */

    public function get_name()
    {
        return 'rs-hero-slider';
    }

    /**
     * Get widget title.
     *
     * @since 1.0.0
     * @access public
     *
     * @return string Widget title.
     */

    public function get_title()
    {
        return esc_html__('RS Hero Slider', 'rsaddon');
    }

    /**
     * Get widget icon.
     *
     * @since 1.0.0
     * @access public
     *
     * @return string Widget icon.
     */
    public function get_icon()
    {
        return 'rs-badge';
    }


    public function get_categories()
    {
        return ['rsaddon_category'];
    }

    public function get_keywords()
    {
        return ['hero-slider', 'hero', 'slider'];
    }


    protected function register_controls()
    {

        $template_dropdown[0] = 'Select Template';
        $best_wp = new wp_Query(array(
            'post_type'      => 'elementor_library',
            'posts_per_page' => -1

        ));

        while ($best_wp->have_posts()) : $best_wp->the_post();
            $title = get_the_title();
            $id = get_the_ID();
            $template_dropdown[$id] = $title;

        endwhile;
        wp_reset_query();

        $this->start_controls_section(
            '_section_hero_slider',
            [
                'label' => esc_html__('Slider Content', 'rsaddon'),
                'tab' => Controls_Manager::TAB_CONTENT,
            ]
        );
            $this->add_control(
                'container_type_setting',
                [
                    'label' => esc_html__( 'Container Type', 'rsaddon' ),
                    'type' => Controls_Manager::SELECT,
                    'default' => 'box',
                    'options' => [
                        ''  => esc_html__( 'Full', 'rsaddon' ),
                        'box' => esc_html__( 'Box', 'rsaddon' ),
                    ]
                ]
            );
            $this->add_control(
                'title_tag',
                [
                    'label'   => esc_html__('Select Heading Tag', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'default' => 'h1',
                    'options' => [
                        'h1' => esc_html__('H1', 'rsaddon'),
                        'h2' => esc_html__('H2', 'rsaddon'),
                        'h3' => esc_html__('H3', 'rsaddon'),
                        'h4' => esc_html__('H4', 'rsaddon'),
                        'h5' => esc_html__('H5', 'rsaddon'),
                        'h6' => esc_html__('H6', 'rsaddon'),
                        'p' => esc_html__('p', 'rsaddon'),
                        'div' => esc_html__('div', 'rsaddon'),
                        'span' => esc_html__('span', 'rsaddon'),
                    ],
                ]
            );
            $this->add_group_control(
                Group_Control_Image_Size::get_type(),
                [
                    'name' => 'thumbnail',
                    'default' => 'full',
                ]
            );
            $this->add_control(
                'show_btns',
                [
                    'label' => esc_html__( 'Show Buttons', 'rsaddon' ),
                    'type' => Controls_Manager::SWITCHER,
                    'label_on' => esc_html__( 'Show', 'rsaddon' ),
                    'label_off' => esc_html__( 'Hide', 'rsaddon' ),
                    'return_value' => 'yes',
                    'default' => 'yes',
                ]
            );
            $this->add_control(
                'right_clip_path_enable',
                [
                    'label' => esc_html__( 'Clip Path Enable?', 'rsaddon' ),
                    'type' => Controls_Manager::SWITCHER,
                    'label_on' => esc_html__( 'Show', 'rsaddon' ),
                    'label_off' => esc_html__( 'Hide', 'rsaddon' ),
                    'return_value' => 'yes',
                    'default' => 'no',
                ]
            );
            
            $repeater = new Repeater();
            $repeater->add_control(
                'slider_type',
                [
                    'label' => esc_html__( 'Slider Type', 'rsaddon' ),
                    'type' => Controls_Manager::SELECT,
                    'default' => '',
                    'options' => [
                        '' => esc_html__( 'Default', 'rsaddon' ),
                        'templates' => esc_html__( 'Templates', 'rsaddon' ),
                    ],
                ]
            );
            $repeater->add_control(
                'template',
                [
                    'label'       => esc_html__( 'Template', 'rsaddon' ),
                    'type'        => Controls_Manager::SELECT, 
                    'label_block' => true,
                    'default'     => 0,         
                    'options' => [] + $template_dropdown,
                    'condition' => [
                        'slider_type' => 'templates',
                    ],
                ]
            );
            $repeater->add_control(
                'sub_title',
                [
                    'label' => esc_html__('Sub Title', 'rsaddon'),
                    'type' => Controls_Manager::TEXT,
                    'default' => esc_html__('Sub Title', 'rsaddon'),
                    'label_block' => true,
                    'placeholder' => esc_html__('Write the sub title here..', 'rsaddon'),
                    'separator' => 'before',
                    'condition' => [
                        'slider_type!' => 'templates',
                    ],
                ]
            );
            $repeater->add_control(
                'sub_title_text_color',
                [
                    'label' => esc_html__( 'Color', 'rsaddon' ),
                    'type' => Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .swiper-wrapper {{CURRENT_ITEM}} .slider-inner .sub-title' => 'color: {{VALUE}}',
                    ],
                    'condition' => [
                        'slider_type!' => 'templates',
                    ],
                ]
            );
            $repeater->add_control(
                'title',
                [
                    'label' => esc_html__('Title', 'rsaddon'),
                    'type' => Controls_Manager::TEXT,
                    'default' => esc_html__('Hello World', 'rsaddon'),
                    'label_block' => true,
                    'placeholder' => esc_html__('Write the title here..', 'rsaddon'),
                    'separator'   => 'before',
                    'condition' => [
                        'slider_type!' => 'templates',
                    ],
                ]
            );
            $repeater->add_control(
                'title_text_color',
                [
                    'label' => esc_html__( 'Color', 'rsaddon' ),
                    'type' => Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .swiper-wrapper {{CURRENT_ITEM}} .slider-inner .title' => 'color: {{VALUE}}',
                    ],
                    'condition' => [
                        'slider_type!' => 'templates',
                    ],
                ]
            );
            $repeater->add_control(
                'description',
                [
                    'label' => esc_html__('Description', 'rsaddon'),
                    'type' => Controls_Manager::TEXTAREA,
                    'default' => esc_html__("There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomized words which don't look even slightly believable", 'rsaddon'),
                    'label_block' => true,
                    'placeholder' => esc_html__('Description text here..', 'rsaddon'),
                    'separator'   => 'before',
                    'condition' => [
                        'slider_type!' => 'templates',
                    ],
                ]
            );
            $repeater->add_control(
                'description_text_color',
                [
                    'label' => esc_html__( 'Color', 'rsaddon' ),
                    'type' => Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .swiper-wrapper {{CURRENT_ITEM}} .slider-inner .description' => 'color: {{VALUE}}',
                    ],
                    'condition' => [
                        'slider_type!' => 'templates',
                    ],
                ]
            );
            $repeater->add_control(
                'layer_image',
                [
                    'label' => esc_html__('Layer Image', 'rsaddon'),
                    'type' => Controls_Manager::MEDIA,
                    'default' => [
                        'url' => Utils::get_placeholder_image_src(),
                    ],
                ]
            );
            $repeater->add_control(
                'btn_txt',
                [
                    'label' => esc_html__('Button Text 1', 'rsaddon'),
                    'type' => Controls_Manager::TEXT,
                    'default' => esc_html__("Read More", 'rsaddon'),
                    'label_block' => true,
                    'placeholder' => esc_html__('Button text here..', 'rsaddon'),
                    'separator'   => 'before',
                    'condition' => [
                        'slider_type!' => 'templates',
                    ],
                ]
            );
            $repeater->add_control(
                'btn_link',
                [
                    'label' => esc_html__( 'Button Link 1', 'rsaddon' ),
                    'type' => Controls_Manager::URL,
                    'label_block' => true,
                    'condition' => [
                        'slider_type!' => 'templates',
                    ],
                ]
            );
            $repeater->add_control(
                'btn_txt2',
                [
                    'label' => esc_html__('Button Text 2', 'rsaddon'),
                    'type' => Controls_Manager::TEXT,
                    'default' => esc_html__("Contact Us", 'rsaddon'),
                    'label_block' => true,
                    'placeholder' => esc_html__('Button text here..', 'rsaddon'),
                    'separator'   => 'before',
                    'condition' => [
                        'slider_type!' => 'templates',
                    ],
                ]
            );
            $repeater->add_control(
                'btn_link2',
                [
                    'label' => esc_html__( 'Button Link 2', 'rsaddon' ),
                    'type' => Controls_Manager::URL,
                    'label_block' => true,
                    'condition' => [
                        'slider_type!' => 'templates',
                    ],
                ]
            );
            $repeater->add_group_control(
                Group_Control_Background::get_type(),
                [
                    'name' => 'current_item_background',
                    'types' => [ 'classic', 'gradient' ],
                    'selector' => '{{WRAPPER}} .rs-hero-slider .swiper-wrapper {{CURRENT_ITEM}}',
                    'separator'   => 'before',
                ]
            );

            $this->add_control(
                'slider_list',
                [
                    'show_label' => false,
                    'type' => Controls_Manager::REPEATER,
                    'fields' => $repeater->get_controls(),
                    'title_field' => '{{{ title }}}',
                    'default' => [
                        [
                            'title' => esc_html__( 'Hello World', 'rsaddon' ),
                            'description' => esc_html__( "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomized words which don't look even slightly believable", 'rsaddon' ),
                        ],
                        [
                            'title' => esc_html__( 'Hello World', 'rsaddon' ),
                            'description' => esc_html__( "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomized words which don't look even slightly believable", 'rsaddon' ),
                        ],
                    ]
                ]
            );
            // Animation Call
            $this->add_control(
                'animation_call_options',
                [
                    'label' => esc_html__( 'Animation Call', 'rsaddon' ),
                    'type' => Controls_Manager::HEADING,
                    'separator' => 'before',
                ]
            );
            $this->add_control(
                'sub_title_animation',
                [
                    'label' => esc_html__( 'Sub Title Animation', 'rsaddon' ),
                    'type' => Controls_Manager::ANIMATION,
                    'render_type' => 'template'
                ]
            );
            $this->add_control(
                'sub_title_animation_delay',
                [
                    'label' => esc_html__( 'Delay', 'rsaddon' ),
                    'type' => Controls_Manager::NUMBER,
                    'step' => 100,
                    'condition' => [
                        'sub_title_animation!' => ['', 'none']
                    ],
                    'placeholder' => esc_html__( '0', 'rsaddon' ),
                ]
            );
            $this->add_control(
                'sub_title_animation_duration',
                [
                    'label' => esc_html__( 'Duration', 'rsaddon' ),
                    'type' => Controls_Manager::NUMBER,
                    'step' => 100,
                    'condition' => [
                        'sub_title_animation!' => ['', 'none']
                    ],
                    'placeholder' => esc_html__( '0', 'rsaddon' ),
                ]
            );
            $this->add_control(
                'title_animation',
                [
                    'label' => esc_html__( 'Title Animation', 'rsaddon' ),
                    'type' => Controls_Manager::ANIMATION,
                    'render_type' => 'template',
                    'separator' => 'before',
                ]
            );
            $this->add_control(
                'title_animation_delay',
                [
                    'label' => esc_html__( 'Delay', 'rsaddon' ),
                    'type' => Controls_Manager::NUMBER,
                    'step' => 100,
                    'condition' => [
                        'title_animation!' => ['', 'none']
                    ],
                    'placeholder' => esc_html__( '0', 'rsaddon' ),
                ]
            );
            $this->add_control(
                'title_animation_duration',
                [
                    'label' => esc_html__( 'Duration', 'rsaddon' ),
                    'type' => Controls_Manager::NUMBER,
                    'step' => 100,
                    'condition' => [
                        'title_animation!' => ['', 'none']
                    ],
                    'placeholder' => esc_html__( '0', 'rsaddon' ),
                ]
            );
            $this->add_control(
                'desc_animation',
                [
                    'label' => esc_html__( 'Description Animation', 'rsaddon' ),
                    'type' => Controls_Manager::ANIMATION,
                    'render_type' => 'template',
                    'separator' => 'before',
                ]
            );
            $this->add_control(
                'desc_animation_delay',
                [
                    'label' => esc_html__( 'Delay', 'rsaddon' ),
                    'type' => Controls_Manager::NUMBER,
                    'step' => 100,
                    'condition' => [
                        'desc_animation!' => ['', 'none']
                    ],
                    'placeholder' => esc_html__( '0', 'rsaddon' ),
                ]
            );
            $this->add_control(
                'desc_animation_duration',
                [
                    'label' => esc_html__( 'Duration', 'rsaddon' ),
                    'type' => Controls_Manager::NUMBER,
                    'step' => 100,
                    'condition' => [
                        'desc_animation!' => ['', 'none']
                    ],
                    'placeholder' => esc_html__( '0', 'rsaddon' ),
                ]
            );
            $this->add_control(
                'img_animation',
                [
                    'label' => esc_html__( 'Image Animation', 'rsaddon' ),
                    'type' => Controls_Manager::ANIMATION,
                    'render_type' => 'template',
                    'separator' => 'before',
                ]
            );
            $this->add_control(
                'img_animation_delay',
                [
                    'label' => esc_html__( 'Delay', 'rsaddon' ),
                    'type' => Controls_Manager::NUMBER,
                    'step' => 100,
                    'condition' => [
                        'img_animation!' => ['', 'none']
                    ],
                    'placeholder' => esc_html__( '0', 'rsaddon' ),
                ]
            );
            $this->add_control(
                'img_animation_duration',
                [
                    'label' => esc_html__( 'Duration', 'rsaddon' ),
                    'type' => Controls_Manager::NUMBER,
                    'step' => 100,
                    'condition' => [
                        'img_animation!' => ['', 'none']
                    ],
                    'placeholder' => esc_html__( '0', 'rsaddon' ),
                ]
            );
            $this->add_control(
                'btn_one_animation',
                [
                    'label' => esc_html__( 'Button One Animation', 'rsaddon' ),
                    'type' => Controls_Manager::ANIMATION,
                    'render_type' => 'template',
                    'separator' => 'before',
                ]
            );
            $this->add_control(
                'btn_one_animation_delay',
                [
                    'label' => esc_html__( 'Delay', 'rsaddon' ),
                    'type' => Controls_Manager::NUMBER,
                    'step' => 100,
                    'condition' => [
                        'btn_one_animation!' => ['', 'none']
                    ],
                    'placeholder' => esc_html__( '0', 'rsaddon' ),
                ]
            );
            $this->add_control(
                'btn_one_animation_duration',
                [
                    'label' => esc_html__( 'Duration', 'rsaddon' ),
                    'type' => Controls_Manager::NUMBER,
                    'step' => 100,
                    'condition' => [
                        'btn_one_animation!' => ['', 'none']
                    ],
                    'placeholder' => esc_html__( '0', 'rsaddon' ),
                ]
            );
            $this->add_control(
                'btn_two_animation',
                [
                    'label' => esc_html__( 'Button Two Animation', 'rsaddon' ),
                    'type' => Controls_Manager::ANIMATION,
                    'render_type' => 'template',
                    'separator' => 'before',
                ]
            );
            $this->add_control(
                'btn_two_animation_delay',
                [
                    'label' => esc_html__( 'Delay', 'rsaddon' ),
                    'type' => Controls_Manager::NUMBER,
                    'step' => 100,
                    'condition' => [
                        'btn_two_animation!' => ['', 'none']
                    ],
                    'placeholder' => esc_html__( '0', 'rsaddon' ),
                ]
            );
            $this->add_control(
                'btn_two_animation_duration',
                [
                    'label' => esc_html__( 'Duration', 'rsaddon' ),
                    'type' => Controls_Manager::NUMBER,
                    'step' => 100,
                    'condition' => [
                        'btn_two_animation!' => ['', 'none']
                    ],
                    'placeholder' => esc_html__( '0', 'rsaddon' ),
                ]
            );
        $this->end_controls_section();

        // Slider Setting Start
        $this->start_controls_section(
			'content_slider',
			[
				'label' => esc_html__('Slider Settings', 'rsaddon'),
				'tab' => Controls_Manager::TAB_CONTENT,
			]
		);
            $this->add_control(
                'col_desktop',
                [
                    'label'   => esc_html__('Desktops Above 1200px', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'label_block' => true,
                    'default' => 1,
                    'options' => [
                        '1' => esc_html__('1 Column', 'rsaddon'),
                        '2' => esc_html__('2 Column', 'rsaddon'),
                        '3' => esc_html__('3 Column', 'rsaddon'),
                        '4' => esc_html__('4 Column', 'rsaddon'),
                        '5' => esc_html__('5 Column', 'rsaddon'),
                        '6' => esc_html__('6 Column', 'rsaddon'),
                        'auto' => esc_html__('Auto', 'rsaddon'),
                    ],
                    'separator' => 'before',
                ]
            );
            $this->add_control(
                'slide_space_between',
                [
                    'label' => esc_html__( 'Desktop Space Between', 'rsaddon' ),
                    'type' => Controls_Manager::SLIDER,
                    'default' => [
                        'size' => 0,
                    ],
                ]
            );
            $this->add_control(
                'col_lg',
                [
                    'label'   => esc_html__('Large 1199px to 992px', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'label_block' => true,
                    'default' => 1,
                    'options' => [
                        '1' => esc_html__('1 Column', 'rsaddon'),
                        '2' => esc_html__('2 Column', 'rsaddon'),
                        '3' => esc_html__('3 Column', 'rsaddon'),
                        '4' => esc_html__('4 Column', 'rsaddon'),
                        '5' => esc_html__('5 Column', 'rsaddon'),
                        '6' => esc_html__('6 Column', 'rsaddon'),
                        'auto' => esc_html__('Auto', 'rsaddon'),
                    ],
                    'separator' => 'before',
                ]
            );
            $this->add_control(
                'slide_space_between_lg',
                [
                    'label' => esc_html__( 'Large Space Between', 'rsaddon' ),
                    'type' => Controls_Manager::SLIDER,
                    'default' => [
                        'size' => 0,
                    ],
                ]
            );
            $this->add_control(
                'col_md',
                [
                    'label'   => esc_html__('Medium 991px to 768px', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'label_block' => true,
                    'default' => 1,
                    'options' => [
                        '1' => esc_html__('1 Column', 'rsaddon'),
                        '2' => esc_html__('2 Column', 'rsaddon'),
                        '3' => esc_html__('3 Column', 'rsaddon'),
                        '4' => esc_html__('4 Column', 'rsaddon'),
                        '6' => esc_html__('6 Column', 'rsaddon'),
                        'auto' => esc_html__('Auto', 'rsaddon'),
                    ],
                    'separator' => 'before',
                ]
            );
            $this->add_control(
                'slide_space_between_md',
                [
                    'label' => esc_html__( 'Medium Space Between', 'rsaddon' ),
                    'type' => Controls_Manager::SLIDER,
                    'default' => [
                        'size' => 0,
                    ],
                ]
            );
            $this->add_control(
                'col_sm',
                [
                    'label'   => esc_html__('Small 767px to 576px', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'label_block' => true,
                    'default' => 1,
                    'options' => [
                        '1' => esc_html__('1 Column', 'rsaddon'),
                        '2' => esc_html__('2 Column', 'rsaddon'),
                        '3' => esc_html__('3 Column', 'rsaddon'),
                        '4' => esc_html__('4 Column', 'rsaddon'),
                        '6' => esc_html__('6 Column', 'rsaddon'),
                        'auto' => esc_html__('Auto', 'rsaddon'),
                    ],
                    'separator' => 'before',
                ]
            );
            $this->add_control(
                'slide_space_between_sm',
                [
                    'label' => esc_html__( 'Small Space Between', 'rsaddon' ),
                    'type' => Controls_Manager::SLIDER,
                    'default' => [
                        'size' => 0,
                    ],
                ]
            );
            $this->add_control(
                'col_xs',
                [
                    'label'   => esc_html__('Mobile Below 575px', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'label_block' => true,
                    'default' => 1,
                    'options' => [
                        '1' => esc_html__('1 Column', 'rsaddon'),
                        '2' => esc_html__('2 Column', 'rsaddon'),
                        '3' => esc_html__('3 Column', 'rsaddon'),
                        '4' => esc_html__('4 Column', 'rsaddon'),
                        '6' => esc_html__('6 Column', 'rsaddon'),
                        'auto' => esc_html__('Auto', 'rsaddon'),
                    ],
                    'separator' => 'before',
                ]
            );
            $this->add_control(
                'slide_space_between_xs',
                [
                    'label' => esc_html__( 'Mobile Space Between', 'rsaddon' ),
                    'type' => Controls_Manager::SLIDER,
                    'default' => [
                        'size' => 0,
                    ],
                ]
            );
            $this->add_control(
                'slides_ToScroll',
                [
                    'label'   => esc_html__('Slide To Scroll', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'default' => 1,
                    'options' => [
                        '1' => esc_html__('1 Item', 'rsaddon'),
                        '2' => esc_html__('2 Item', 'rsaddon'),
                        '3' => esc_html__('3 Item', 'rsaddon'),
                        '4' => esc_html__('4 Item', 'rsaddon'),
                    ],
                    'separator' => 'before',
                ]
            );

            $this->add_control(
                'slider_speed',
                [
                    'label'   => esc_html__('Slide Transition', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'default' => 500,
                    'options' => [
                        '300' => esc_html__('300 ms', 'rsaddon'),
                        '500' => esc_html__('500 ms', 'rsaddon'),
                        '700' => esc_html__('700 ms', 'rsaddon'),
                        '1000' => esc_html__('1000 ms', 'rsaddon'),
                        '1500' => esc_html__('1500 ms', 'rsaddon'),
                        '2000' => esc_html__('2000 ms', 'rsaddon'),
                        '2500' => esc_html__('2500 ms', 'rsaddon'),
                        '3000' => esc_html__('3000 ms', 'rsaddon'),
                        '3500' => esc_html__('3500 ms', 'rsaddon'),
                        '4000' => esc_html__('4000 ms', 'rsaddon'),
                        '4500' => esc_html__('4500 ms', 'rsaddon'),
                        '5000' => esc_html__('5000 ms', 'rsaddon'),
                    ],
                    'separator' => 'before',
                ]
            );

            $this->add_control(
                'slider_direction',
                [
                    'label'   => esc_html__('Direction', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'default' => '',
                    'options' => [
                        '' => esc_html__('Left', 'rsaddon'),
                        'right' => esc_html__('Right', 'rsaddon'),
                    ],
                    'separator' => 'before',
                ]
            );

            $this->add_control(
                'slider_effect',
                [
                    'label'   => esc_html__('Slide Effect', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'default' => '',
                    'options' => [
                        '' => esc_html__('Default', 'rsaddon'),
                        'fade' => esc_html__('Fade', 'rsaddon'),
                        'cube' => esc_html__('Cube', 'rsaddon'),
                        'coverflow' => esc_html__('Coverflow', 'rsaddon'),
                        'flip' => esc_html__('Flip', 'rsaddon'),
                        'cards' => esc_html__('Cards', 'rsaddon'),
                        'creative' => esc_html__('Creative', 'rsaddon'),
                    ],
                    'separator' => 'before',
                ]
            );
            $this->add_control(
                'slider_creative_style',
                [
                    'label'   => esc_html__('Creative Style', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'default' => '',
                    'options' => [
                        '' => esc_html__('One', 'rsaddon'),
                        'two' => esc_html__('Two', 'rsaddon'),
                        'three' => esc_html__('Three', 'rsaddon'),
                        'four' => esc_html__('Four', 'rsaddon')
                    ],
                    'condition' => [
                        'slider_effect' => 'creative'
                    ],
                ]
            );
            $this->add_control(
                'slider_effect_warning',
                [
                    'type'            => Controls_Manager::RAW_HTML,
                    'raw'             => __('The <strong>cube effect</strong> may not function correctly when displaying more than <strong>one item</strong> simultaneously.', 'rsaddon'),
                    'content_classes' => 'rs-panel-notice',
                    'condition' => [
                        'col_desktop!' => '1',
                        'slider_effect' => 'cube'
                    ]
                ]
            );
            $this->add_control(
                'slider_dots',
                [
                    'label'   => esc_html__('Navigation Bullets', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'default' => 'false',
                    'options' => [
                        'true' => esc_html__('Enable', 'rsaddon'),
                        'false' => esc_html__('Disable', 'rsaddon'),
                    ],
                    'separator' => 'before',
                ]

            );
            $this->add_control(
                'slider_bullet_type',
                [
                    'label'   => esc_html__('Bullets Type', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'default' => '',
                    'options' => [
                        '' => esc_html__('Dots', 'rsaddon'),
                        'progressbar' => esc_html__('Progressbar', 'rsaddon'),
                        'fraction' => esc_html__('Fraction Number', 'rsaddon'),
                    ],
                    'condition' => [
                        'slider_dots' => 'true',
                    ]
                ]

            );
            $this->add_control(
                'slider_dynamic_bullets',
                [
                    'label'   => esc_html__('Dynamic Bullets', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'default' => 'false',
                    'options' => [
                        'true' => esc_html__('Enable', 'rsaddon'),
                        'false' => esc_html__('Disable', 'rsaddon'),
                    ],
                    'condition' => [
                        'slider_dots' => 'true',
                        'slider_bullet_type!' => ['progressbar', 'fraction']
                    ]
                ]
            );
            $this->add_control(
                'slider_dots_style',
                [
                    'label'   => esc_html__('Bullets Style', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'default' => 'default',
                    'options' => [
                        'default' => esc_html__('Default', 'rsaddon'),
                        '2' => esc_html__('Style 2', 'rsaddon')
                    ],
                    'condition' => [
                        'slider_dots' => 'true',
                        'slider_bullet_type!' => ['progressbar', 'fraction']
                    ]
                ]
            );
            $this->add_control(
                'slider_nav',
                [
                    'label'   => esc_html__('Navigation Nav', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'default' => 'false',
                    'options' => [
                        'true' => esc_html__('Enable', 'rsaddon'),
                        'false' => esc_html__('Disable', 'rsaddon'),
                    ],
                    'separator' => 'before',
                ]

            );
            $this->add_control(
                'slider_nav_icon_style',
                [
                    'label'   => esc_html__('Nav Icon Style', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'default' => '',
                    'options' => [
                        '' => esc_html__('Style 1', 'rsaddon'),
                        '2' => esc_html__('Style 2', 'rsaddon'),
                    ],
                    'condition' => [
                        'slider_nav' => 'true'
                    ]
                ]

            );
            $this->add_control(
                'slider_scrollbar',
                [
                    'label'   => esc_html__('Scrollbar', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'default' => 'false',
                    'options' => [
                        'true' => esc_html__('Enable', 'rsaddon'),
                        'false' => esc_html__('Disable', 'rsaddon'),
                    ],
                    'separator' => 'before',
                ]
            );
            $this->add_control(
                'slider_scrollbar_warning',
                [
                    'type'            => Controls_Manager::RAW_HTML,
                    'raw'             => __('The <strong>Scrollbar</strong> functionality may not operate as expected when the <strong>loop</strong>  feature is enabled.', 'rsaddon'),
                    'content_classes' => 'rs-panel-notice',
                    'condition' => [
                        'slider_loop' => 'true',
                        'slider_scrollbar' => 'true'
                    ]
                ]
            );
            $this->add_control(
                'slider_autoplay',
                [
                    'label'   => esc_html__('Autoplay', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'default' => 'false',
                    'options' => [
                        'true' => esc_html__('Enable', 'rsaddon'),
                        'false' => esc_html__('Disable', 'rsaddon'),
                    ],
                    'separator' => 'before',

                ]
            );
            $this->add_control(
                'slide_item_circle_progress',
                [
                    'label'   => esc_html__('Auto Play Progress', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'default' => 'false',
                    'options' => [
                        'true' => esc_html__('Enable', 'rsaddon'),
                        'false' => esc_html__('Disable', 'rsaddon'),
                    ],
                    'condition' => [
                        'slider_autoplay' => 'true'
                    ]
                ]
            );
            $this->add_control(
                'slider_stop_on_hover',
                [
                    'label'   => esc_html__('Stop on Hover', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'default' => 'false',
                    'options' => [
                        'true' => esc_html__('Enable', 'rsaddon'),
                        'false' => esc_html__('Disable', 'rsaddon'),
                    ],
                    'condition' => [
                        'slider_autoplay' => 'true'
                    ]
                ]
            );
            $this->add_control(
                'slider_interval',
                [
                    'label'   => esc_html__('Autoplay Interval', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'default' => 3000,
                    'options' => [
                        '500' => esc_html__('500 ms', 'rsaddon'),
                        '700' => esc_html__('700 ms', 'rsaddon'),
                        '1000' => esc_html__('1000 ms', 'rsaddon'),
                        '1500' => esc_html__('1500 ms', 'rsaddon'),
                        '2000' => esc_html__('2000 ms', 'rsaddon'),
                        '2500' => esc_html__('2500 ms', 'rsaddon'),
                        '3000' => esc_html__('3000 ms', 'rsaddon'),
                        '3500' => esc_html__('3500 ms', 'rsaddon'),
                        '4000' => esc_html__('4000 ms', 'rsaddon'),
                        '4500' => esc_html__('4500 ms', 'rsaddon'),
                        '5000' => esc_html__('5000 ms', 'rsaddon'),
                        '5500' => esc_html__('5500 ms', 'rsaddon'),
                        '6000' => esc_html__('6000 ms', 'rsaddon'),
                        '6500' => esc_html__('6500 ms', 'rsaddon'),
                        '7000' => esc_html__('7000 ms', 'rsaddon'),
                        '7500' => esc_html__('7500 ms', 'rsaddon'),
                        '8000' => esc_html__('8000 ms', 'rsaddon'),
                        '8500' => esc_html__('8500 ms', 'rsaddon'),
                        '9000' => esc_html__('9000 ms', 'rsaddon'),
                        '9500' => esc_html__('9500 ms', 'rsaddon'),
                        '10000' => esc_html__('10000 ms', 'rsaddon'),
                    ],
                    'condition' => [
                        'slider_autoplay' => 'true'
                    ]
                ]
            );
            $this->add_control(
                'slider_loop',
                [
                    'label'   => esc_html__('Loop', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'default' => 'true',
                    'options' => [
                        'true' => esc_html__('Enable', 'rsaddon'),
                        'false' => esc_html__('Disable', 'rsaddon'),
                    ],
                    'separator' => 'before',
                ]
            );
            $this->add_control(
                'slider_auto_height',
                [
                    'label'   => esc_html__('Auto Height', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'default' => 'false',
                    'options' => [
                        'true' => esc_html__('Enable', 'rsaddon'),
                        'false' => esc_html__('Disable', 'rsaddon'),
                    ],
                    'separator' => 'before',
                ]
            );
            $this->add_control(
                'slider_free_mode',
                [
                    'label'   => esc_html__('Free Mode', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'default' => 'false',
                    'options' => [
                        'true' => esc_html__('Enable', 'rsaddon'),
                        'false' => esc_html__('Disable', 'rsaddon'),
                    ],
                    'separator' => 'before',
                ]
            );
            $this->add_control(
                'slider_grab_cursor',
                [
                    'label'   => esc_html__('Grab Cursor', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'default' => 'false',
                    'options' => [
                        'true' => esc_html__('Enable', 'rsaddon'),
                        'false' => esc_html__('Disable', 'rsaddon'),
                    ],
                    'separator' => 'before',
                ]
            );
            $this->add_control(
                'slider_mousewheel',
                [
                    'label'   => esc_html__('Mousewheel', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'default' => 'false',
                    'options' => [
                        'true' => esc_html__('Enable', 'rsaddon'),
                        'false' => esc_html__('Disable', 'rsaddon'),
                    ],
                    'separator' => 'before',
                ]
            );
            $this->add_control(
                'slider_keyboard_control',
                [
                    'label'   => esc_html__('Keyboard Control', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'default' => 'false',
                    'options' => [
                        'true' => esc_html__('Enable', 'rsaddon'),
                        'false' => esc_html__('Disable', 'rsaddon'),
                    ],
                    'separator' => 'before',
                ]
            );
            $this->add_control(
                'slider_centerMode',
                [
                    'label'   => esc_html__('Center Mode', 'rsaddon'),
                    'type'    => Controls_Manager::SELECT,
                    'default' => 'false',
                    'options' => [
                        'true' => esc_html__('Enable', 'rsaddon'),
                        'false' => esc_html__('Disable', 'rsaddon'),
                    ],
                    'separator' => 'before',
                ]
            );
            $this->add_control(
                'slider_slider_center_mode_warning',
                [
                    'type'            => Controls_Manager::RAW_HTML,
                    'raw'             => __("If <strong>center mode</strong> doesn't work as expected, enable the <strong>loop</strong> feature and ensure there are <strong>enough items</strong> to center one properly.", 'rsaddon'),
                    'content_classes' => 'rs-panel-notice',
                    'condition' => [
                        'slider_centerMode' => 'true'
                    ]
                ]
            );
            $this->add_control(
                'swiper_item_wrapper_padding',
                [
                    'label' => esc_html__( 'Swiper Wrapper Padding', 'rsaddon' ),
                    'type' => Controls_Manager::DIMENSIONS,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-wrapper' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ],
                    'separator' => 'before',
                ]
            );
		$this->end_controls_section();
        // Slider Setting End

        // Global Style Start
        $this->start_controls_section(
			'_section_global_style',
			[
				'label' => esc_html__('General Style', 'rsaddon'),
				'tab' => Controls_Manager::TAB_STYLE,
			]
		);
            $this->add_responsive_control(
                'g_text_align',
                [
                    'label' => esc_html__( 'Alignment', 'rsaddon' ),
                    'type' => Controls_Manager::CHOOSE,
                    'options' => [
                        'left' => [
                            'title' => esc_html__( 'Left', 'rsaddon' ),
                            'icon' => 'eicon-text-align-left',
                        ],
                        'center' => [
                            'title' => esc_html__( 'Center', 'rsaddon' ),
                            'icon' => 'eicon-text-align-center',
                        ],
                        'right' => [
                            'title' => esc_html__( 'Right', 'rsaddon' ),
                            'icon' => 'eicon-text-align-right',
                        ],
                    ],
                    'toggle' => true,
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .swiper-wrapper' => 'text-align: {{VALUE}};',
                    ],
                    'separator' => 'before'
                ]
            );
            $this->add_responsive_control(
                'g_display_style',
                [
                    'label' => esc_html__( 'Display Style (Inline / Block)', 'rsaddon' ),
                    'type' => Controls_Manager::CHOOSE,
                    'options' => [
                        'flex' => [
                            'title' => esc_html__( 'Inline', 'rsaddon' ),
                            'icon' => 'eicon-post-list',
                        ],
                        'block' => [
                            'title' => esc_html__( 'Block', 'rsaddon' ),
                            'icon' => 'eicon-posts-grid',
                        ],
                    ],
                    'toggle' => true,
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .slider-inner' => 'display: {{VALUE}};',
                    ],
                ]
            );
            $this->add_responsive_control(
                'g_vertical_align',
                [
                    'label' => esc_html__( 'Vertical Align', 'rsaddon' ),
                    'type' => Controls_Manager::CHOOSE,
                    'options' => [
                        'flex-start' => [
                            'title' => esc_html__( 'Top', 'rsaddon' ),
                            'icon' => 'eicon-align-start-v',
                        ],
                        'center' => [
                            'title' => esc_html__( 'Middle', 'rsaddon' ),
                            'icon' => 'eicon-align-center-v',
                        ],
                        'flex-end' => [
                            'title' => esc_html__( 'Bottom', 'rsaddon' ),
                            'icon' => 'eicon-align-end-v',
                        ],
                    ],
                    'condition' => [
                        'g_display_style' => 'flex',
                    ],
                    'toggle' => true,
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .slider-inner' => 'align-items: {{VALUE}};',
                    ],
                ]
            );
            $this->add_responsive_control(
                'g_column_align',
                [
                    'label' => esc_html__( 'Column Direction', 'rsaddon' ),
                    'type' => Controls_Manager::CHOOSE,
                    'options' => [
                        'row' => [
                            'title' => esc_html__( 'Row', 'rsaddon' ),
                            'icon' => 'eicon-justify-start-h',
                        ],
                        'row-reverse' => [
                            'title' => esc_html__( 'Row Reverse', 'rsaddon' ),
                            'icon' => 'eicon-wrap',
                        ],
                        'column' => [
                            'title' => esc_html__( 'Column', 'rsaddon' ),
                            'icon' => 'eicon-justify-start-v',
                        ],
                        'column-reverse' => [
                            'title' => esc_html__( 'Column Reverse', 'rsaddon' ),
                            'icon' => 'eicon-wrap',
                        ],
                    ],
                    'condition' => [
                        'g_display_style' => 'flex',
                    ],
                    'toggle' => true,
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .slider-inner' => 'flex-direction: {{VALUE}};',
                    ],
                ]
            );
            $this->add_responsive_control(
                'g_h_align',
                [
                    'label' => esc_html__( 'Horizontal Align', 'rsaddon' ),
                    'type' => Controls_Manager::CHOOSE,
                    'options' => [
                        'flex-start' => [
                            'title' => esc_html__( 'Start', 'rsaddon' ),
                            'icon' => 'eicon-align-start-h',
                        ],
                        'center' => [
                            'title' => esc_html__( 'Center', 'rsaddon' ),
                            'icon' => 'eicon-align-center-h',
                        ],
                        'flex-end' => [
                            'title' => esc_html__( 'End', 'rsaddon' ),
                            'icon' => 'eicon-align-end-h',
                        ],
                        'space-between' => [
                            'title' => esc_html__( 'Space Between', 'rsaddon' ),
                            'icon' => 'eicon-justify-space-between-h',
                        ],

                    ],
                    'condition' => [
                        'g_display_style' => 'flex',
                    ],
                    'toggle' => true,
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .slider-inner' => 'justify-content: {{VALUE}};',
                    ],
                ]
            );
            
            $this->add_responsive_control(
                'g_overflow',
                [
                    'label' => esc_html__( 'Overflow', 'rsaddon' ),
                    'type' => Controls_Manager::SELECT,
                    'default' => '',
                    'options' => [
                        '' => esc_html__( 'Default', 'rsaddon' ),
                        'hidden' => esc_html__( 'Hidden', 'rsaddon' ),
                        'visible'  => esc_html__( 'Visible', 'rsaddon' ),
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .slider-inner' => 'overflow: {{VALUE}};',
                    ],
                ]
            );

            $this->add_responsive_control(
                'g_padding',
                [
                    'label' => esc_html__( 'Padding', 'rsaddon' ),
                    'type' => Controls_Manager::DIMENSIONS,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .slider-inner' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ],
                ]
            );
            $this->add_responsive_control(
                'g_margin',
                [
                    'label' => esc_html__( 'Margin', 'rsaddon' ),
                    'type' => Controls_Manager::DIMENSIONS,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .slider-inner' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ],
                ]
            );
            $this->add_responsive_control(
                'g_border_radius',
                [
                    'label' => esc_html__( 'Border Radius', 'rsaddon' ),
                    'type' => Controls_Manager::DIMENSIONS,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .slider-inner' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ],
                ]
            );
            $this->add_responsive_control(
                'g_item_min_height_full',
                [
                    'label' => esc_html__( 'Item Min Height', 'rsaddon' ),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'range' => [
                        'px' => [
                            'min' => 0,
                            'max' => 1500,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .swiper-slide' => 'min-height: {{SIZE}}{{UNIT}};'
                    ],
                    'condition' => [
                        'container_type_setting!' => 'box'
                    ],
                    'render_type' => 'template'
                ]
            );
            $this->add_responsive_control(
                'g_item_min_height_container',
                [
                    'label' => esc_html__( 'Container Min Height', 'rsaddon' ),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'range' => [
                        'px' => [
                            'min' => 0,
                            'max' => 1500,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .swiper-slide .rs-e-container' => 'min-height: {{SIZE}}{{UNIT}};'
                    ],
                    'condition' => [
                        'container_type_setting' => 'box'
                    ]
                ]
            );
            $this->add_responsive_control(
                'slider_inner_min_height',
                [
                    'label' => esc_html__( 'Inner Min Height', 'rsaddon' ),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'range' => [
                        'px' => [
                            'min' => 0,
                            'max' => 1500,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .slider-inner' => 'min-height: {{SIZE}}{{UNIT}};'
                    ],
                ]
            );
            $this->add_responsive_control(
                'slider_inner_max_width',
                [
                    'label' => esc_html__( 'Inner Max Width', 'rsaddon' ),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'range' => [
                        'px' => [
                            'min' => 0,
                            'max' => 1500,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .slider-inner' => 'max-width: {{SIZE}}{{UNIT}};'
                    ],
                ]
            );
            $this->add_responsive_control(
                'g_filter_blur',
                [
                    'label' => esc_html__( 'Filter Blur', 'rsaddon' ),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px'],
                    'range' => [
                        'px' => [
                            'min' => 0,
                            'max' => 100,
                        ]
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .slider-inner' => 'backdrop-filter: blur({{SIZE}}{{UNIT}});',
                    ]
                ]
            );
            $this->add_group_control(
                Group_Control_Background::get_type(),
                [
                    'name' => 'g_background',
                    'types' => [ 'classic', 'gradient' ],
                    'selector' => '{{WRAPPER}} .rs-hero-slider .slider-inner',
                ]
            );
            $this->add_group_control(
                Group_Control_Border::get_type(),
                [
                    'name' => 'g_border',
                    'selector' => '{{WRAPPER}} .rs-hero-slider .slider-inner',
                ]
            );
            $this->add_group_control(
                Group_Control_Box_Shadow::get_type(),
                [
                    'name' => 'g_box_shadow',
                    'selector' => '{{WRAPPER}} .rs-hero-slider .slider-inner',
                ]
            );
            $this->add_control(
                'color_shape',
                [
                    'label' => esc_html__( 'Color Shape', 'rsaddon' ),
                    'type' => Controls_Manager::COLOR,
                    'separator' => 'before',
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .slider-inner::before' => 'border-bottom-color: {{VALUE}}',
                    ],
                ]
            );

            // Slider Inner Position Maker Start
            $this->add_control(
                'slider_inner_position_maker',
                [
                    'label' => esc_html__( 'Position Maker', 'rsaddon' ),
                    'type' => Controls_Manager::POPOVER_TOGGLE,
                    'label_off' => esc_html__( 'Default', 'rsaddon' ),
                    'label_on' => esc_html__( 'Custom', 'rsaddon' ),
                    'return_value' => 'yes',
                    'default' => 'no',
                    'separator' => 'before',
                ]
            );
            
            $this->start_popover();
                $this->add_responsive_control(
                    'slider_inner_position',
                    [
                        'label' => esc_html__( 'Position', 'rsaddon' ),
                        'type' => Controls_Manager::SELECT,
                        'default' => '',
                        'options' => [
                            '' => esc_html__( 'Default', 'rsaddon' ),
                            'absolute' => esc_html__( 'Absolute', 'rsaddon' ),
                            'relative'  => esc_html__( 'Relative', 'rsaddon' ),
                        ],
                        'selectors' => [
                            '{{WRAPPER}} .rs-hero-slider .slider-inner' => 'position: {{VALUE}};',
                        ],
                    ]
                );
                $this->add_responsive_control(
                    'slider_inner_p_top',
                    [
                        'label' => esc_html__( 'Top', 'rsaddon' ),
                        'type' => Controls_Manager::SLIDER,
                        'size_units' => [ 'px', '%', 'custom' ],
                        'range' => [
                            'px' => [
                                'min' => -1000,
                                'max' => 1000,
                            ],
                            '%' => [
                                'min' => -100,
                                'max' => 100,
                            ],
                        ],
                        'condition' => [
                            'slider_inner_position' => ['absolute', 'relative']
                        ],
                        'selectors' => [
                            '{{WRAPPER}} .rs-hero-slider .slider-inner' => 'top: {{SIZE}}{{UNIT}};',
                        ],
                    ]
                );
                $this->add_responsive_control(
                    'slider_inner_p_right',
                    [
                        'label' => esc_html__( 'Right', 'rsaddon' ),
                        'type' => Controls_Manager::SLIDER,
                        'size_units' => [ 'px', '%', 'custom' ],
                        'range' => [
                            'px' => [
                                'min' => -1000,
                                'max' => 1000,
                            ],
                            '%' => [
                                'min' => -100,
                                'max' => 100,
                            ],
                        ],
                        'condition' => [
                            'slider_inner_position' => ['absolute', 'relative']
                        ],
                        'selectors' => [
                            '{{WRAPPER}} .rs-hero-slider .slider-inner' => 'right: {{SIZE}}{{UNIT}};',
                        ],
                    ]
                );
                $this->add_responsive_control(
                    'slider_inner_p_bottom',
                    [
                        'label' => esc_html__( 'Bottom', 'rsaddon' ),
                        'type' => Controls_Manager::SLIDER,
                        'size_units' => [ 'px', '%', 'custom' ],
                        'range' => [
                            'px' => [
                                'min' => -1000,
                                'max' => 1000,
                            ],
                            '%' => [
                                'min' => -100,
                                'max' => 100,
                            ],
                        ],
                        'condition' => [
                            'slider_inner_position' => ['absolute', 'relative']
                        ],
                        'selectors' => [
                            '{{WRAPPER}} .rs-hero-slider .slider-inner' => 'bottom: {{SIZE}}{{UNIT}};',
                        ],
                    ]
                );
                $this->add_responsive_control(
                    'slider_inner_p_left',
                    [
                        'label' => esc_html__( 'Left', 'rsaddon' ),
                        'type' => Controls_Manager::SLIDER,
                        'size_units' => [ 'px', '%', 'custom' ],
                        'range' => [
                            'px' => [
                                'min' => -1000,
                                'max' => 1000,
                            ],
                            '%' => [
                                'min' => -100,
                                'max' => 100,
                            ],
                        ],
                        'condition' => [
                            'slider_inner_position' => ['absolute', 'relative']
                        ],
                        'selectors' => [
                            '{{WRAPPER}} .rs-hero-slider .slider-inner' => 'left: {{SIZE}}{{UNIT}};',
                        ],
                    ]
                );
            $this->end_popover();
            // Slider Inner Position Maker End
        $this->end_controls_section();
        // Global Style End

        // Content Part Style Start
        $this->start_controls_section(
			'_section_content_part_style',
			[
				'label' => esc_html__('Content Part Style', 'rsaddon'),
				'tab' => Controls_Manager::TAB_STYLE,
			]
		);
            $this->add_responsive_control(
                'content_part_width',
                [
                    'label' => esc_html__( 'Width', 'rsaddon' ),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'range' => [
                        'px' => [
                            'min' => 0,
                            'max' => 1500,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .slider-inner .content-part' => 'width: {{SIZE}}{{UNIT}};'
                    ],
                ]
            );
            $this->add_group_control(
                Group_Control_Background::get_type(),
                [
                    'name' => 'content_part_background',
                    'types' => [ 'classic', 'gradient' ],
                    'selector' => '{{WRAPPER}} .rs-hero-slider .slider-inner .content-part',
                ]
            );
            $this->add_control(
                'content_part_padding',
                [
                    'label' => esc_html__( 'Padding', 'rsaddon' ),
                    'type' => Controls_Manager::DIMENSIONS,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .slider-inner .content-part' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}; overflow: hidden;',
                    ],
                ]
            );
            $this->add_control(
                'content_part_margin',
                [
                    'label' => esc_html__( 'Margin', 'rsaddon' ),
                    'type' => Controls_Manager::DIMENSIONS,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .slider-inner .content-part' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}; overflow: hidden;',
                    ],
                ]
            );
            $this->add_control(
                'content_part_radius',
                [
                    'label' => esc_html__( 'Border Radius', 'rsaddon' ),
                    'type' => Controls_Manager::DIMENSIONS,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .slider-inner .content-part' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}; overflow: hidden;',
                    ],
                ]
            );
            $this->add_group_control(
                Group_Control_Border::get_type(),
                [
                    'name' => 'content_part_border',
                    'selector' => '{{WRAPPER}} .rs-hero-slider .slider-inner .content-part',
                ]
            );
            $this->add_group_control(
                Group_Control_Box_Shadow::get_type(),
                [
                    'name' => 'content_part_box_shadow',
                    'selector' => '{{WRAPPER}} .rs-hero-slider .slider-inner .content-part',
                ]
            );
        $this->end_controls_section();
        // Content Part Style End

        // Title Style Start
        $this->start_controls_section(
			'_section_title_style',
			[
				'label' => esc_html__('Title Style', 'rsaddon'),
				'tab' => Controls_Manager::TAB_STYLE,
			]
		);
            $this->add_control(
                'title_text_color',
                [
                    'label' => esc_html__( 'Color', 'rsaddon' ),
                    'type' => Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .swiper-wrapper .slider-inner .title' => 'color: {{VALUE}}',
                    ],
                ]
            );
            $this->add_group_control(
                Group_Control_Typography::get_type(),
                [
                    'name' => 'title_typography',
                    'selector' => '{{WRAPPER}} .rs-hero-slider .swiper-wrapper .slider-inner .title',
                ]
            );
            $this->add_group_control(
                Group_Control_Text_Stroke::get_type(),
                [
                    'name' => 'title_text_stroke',
                    'selector' => '{{WRAPPER}} .rs-hero-slider .swiper-wrapper .slider-inner .title',
                ]
            );
            $this->add_responsive_control(
                'title_padding',
                [
                    'label' => esc_html__( 'Padding', 'rsaddon' ),
                    'type' => Controls_Manager::DIMENSIONS,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .swiper-wrapper .slider-inner .title' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ],
                ]
            );
            $this->add_responsive_control(
                'title_margin',
                [
                    'label' => esc_html__( 'Margin', 'rsaddon' ),
                    'type' => Controls_Manager::DIMENSIONS,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .swiper-wrapper .slider-inner .title' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ],
                ]
            );
        $this->end_controls_section();
        // Title Style End

        // Description Style Start
        $this->start_controls_section(
			'_section_desc_style',
			[
				'label' => esc_html__('Description Style', 'rsaddon'),
				'tab' => Controls_Manager::TAB_STYLE,
			]
		);
            $this->add_control(
                'desc_text_color',
                [
                    'label' => esc_html__( 'Color', 'rsaddon' ),
                    'type' => Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .swiper-wrapper .slider-inner .description' => 'color: {{VALUE}}',
                    ],
                ]
            );
            $this->add_group_control(
                Group_Control_Typography::get_type(),
                [
                    'name' => 'desc_typography',
                    'selector' => '{{WRAPPER}} .rs-hero-slider .swiper-wrapper .slider-inner .description',
                ]
            );
            $this->add_responsive_control(
                'desc_padding',
                [
                    'label' => esc_html__( 'Padding', 'rsaddon' ),
                    'type' => Controls_Manager::DIMENSIONS,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .swiper-wrapper .slider-inner .description' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ],
                ]
            );
            $this->add_responsive_control(
                'desc_margin',
                [
                    'label' => esc_html__( 'Margin', 'rsaddon' ),
                    'type' => Controls_Manager::DIMENSIONS,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .swiper-wrapper .slider-inner .description' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ],
                ]
            );
        $this->end_controls_section();
        // Description Style End
        
        // Image Style Start
        $this->start_controls_section(
			'_section_image_style',
			[
				'label' => esc_html__('Image Style', 'rsaddon'),
				'tab' => Controls_Manager::TAB_STYLE,
			]
		);
            $this->add_control(
                'image_heading',
                [
                    'label' => esc_html__( 'Image Options', 'rsaddon' ),
                    'type' => Controls_Manager::HEADING,
                ]
            );
            $this->add_responsive_control(
                'img_width',
                [
                    'label' => esc_html__( 'Width', 'rsaddon' ),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'range' => [
                        'px' => [
                            'min' => 0,
                            'max' => 1500,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .slider-inner .image-part img' => 'width: {{SIZE}}{{UNIT}}; height: auto;'
                    ],
                ]
            );
            $this->add_responsive_control(
                'img_height',
                [
                    'label' => esc_html__( 'Height', 'rsaddon' ),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'range' => [
                        'px' => [
                            'min' => 0,
                            'max' => 1500,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .slider-inner .image-part img' => 'height: {{SIZE}}{{UNIT}};'
                    ],
                ]
            );
            $this->add_control(
                'img_radius',
                [
                    'label' => esc_html__( 'Border Radius', 'rsaddon' ),
                    'type' => Controls_Manager::DIMENSIONS,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .slider-inner .image-part img' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ],
                ]
            );

            $this->add_control(
                'img_wrapper_heading',
                [
                    'label' => esc_html__( 'Wrapper Options', 'rsaddon' ),
                    'type' => Controls_Manager::HEADING,
                    'separator' => 'before'
                ]
            );
            $this->add_responsive_control(
                'img_wrapper_width',
                [
                    'label' => esc_html__( 'Width', 'rsaddon' ),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'range' => [
                        'px' => [
                            'min' => 0,
                            'max' => 1500,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .slider-inner .image-part' => 'width: {{SIZE}}{{UNIT}};'
                    ],
                ]
            );
            $this->add_group_control(
                Group_Control_Background::get_type(),
                [
                    'name' => 'img_wrapper_background',
                    'types' => [ 'classic', 'gradient' ],
                    'selector' => '{{WRAPPER}} .rs-hero-slider .slider-inner .image-part',
                ]
            );
            $this->add_control(
                'img_wrapper_padding',
                [
                    'label' => esc_html__( 'Padding', 'rsaddon' ),
                    'type' => Controls_Manager::DIMENSIONS,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .slider-inner .image-part' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}; overflow: hidden;',
                    ],
                ]
            );
            $this->add_control(
                'img_wrapper_margin',
                [
                    'label' => esc_html__( 'Margin', 'rsaddon' ),
                    'type' => Controls_Manager::DIMENSIONS,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .slider-inner .image-part' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}; overflow: hidden;',
                    ],
                ]
            );
            $this->add_control(
                'img_wrapper_radius',
                [
                    'label' => esc_html__( 'Border Radius', 'rsaddon' ),
                    'type' => Controls_Manager::DIMENSIONS,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-hero-slider .slider-inner .image-part' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}; overflow: hidden;',
                    ],
                ]
            );
            $this->add_group_control(
                Group_Control_Border::get_type(),
                [
                    'name' => 'img_wrapper_border',
                    'selector' => '{{WRAPPER}} .rs-hero-slider .slider-inner .image-part',
                ]
            );
            $this->add_group_control(
                Group_Control_Box_Shadow::get_type(),
                [
                    'name' => 'img_wrapper_box_shadow',
                    'selector' => '{{WRAPPER}} .rs-hero-slider .slider-inner .image-part',
                ]
            );
        $this->end_controls_section();
        // Image Style End

        // Arrow Section Start
		$this->start_controls_section(
			'section_slider_style_arrow_ontrol',
			[
				'label' => esc_html__('Arrow Control', 'rsaddon'),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
					'slider_nav' => 'true'
				]
			]
		);
            // positioning start
            $this->add_control(
                'arrow_position_maker',
                [
                    'label' => esc_html__('Arrow Position Style', 'rsaddon'),
                    'type' => Controls_Manager::SELECT,
                    'default' => '',
                    'options' => [
                        '' => esc_html__('Default', 'rsaddon'),
                        'custom' => esc_html__('Custom', 'rsaddon'),
                    ],
                ]
            );
            $this->add_responsive_control(
                'arrow_prev_x_select',
                [
                    'label' => esc_html__('Prev Position X', 'rsaddon'),
                    'type' => Controls_Manager::SELECT,
                    'default' => '',
                    'options' => [
                        '' => esc_html__('Default', 'rsaddon'),
                        'left' => esc_html__('Left', 'rsaddon'),
                        'right' => esc_html__('Right', 'rsaddon'),
                    ],
                    'condition' => [
                        'arrow_position_maker' => 'custom'
                    ]
                ]
            );
            $this->add_responsive_control(
                'arrow_prev_left_position',
                [
                    'label' => esc_html__('Prev Left Position', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'range' => [
                        'px' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => 0,
                            'max' => 100,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-button-prev' => 'left: {{SIZE}}{{UNIT}}; right: unset;',
                    ],
                    'condition' => [
                        'arrow_prev_x_select' => 'left',
                        'arrow_position_maker' => 'custom'
                    ]
                ]
            );
            $this->add_responsive_control(
                'arrow_prev_right_position',
                [
                    'label' => esc_html__('Prev Right Position', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'range' => [
                        'px' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => 0,
                            'max' => 100,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-button-prev' => 'right: {{SIZE}}{{UNIT}}; left: unset;',
                    ],
                    'condition' => [
                        'arrow_prev_x_select' => 'right',
                        'arrow_position_maker' => 'custom'
                    ]
                ]
            );

            $this->add_responsive_control(
                'arrow_prev_y_select',
                [
                    'label' => esc_html__('Prev Position Y', 'rsaddon'),
                    'type' => Controls_Manager::SELECT,
                    'default' => '',
                    'options' => [
                        '' => esc_html__('Default', 'rsaddon'),
                        'top' => esc_html__('Top', 'rsaddon'),
                        'bottom' => esc_html__('Bottom', 'rsaddon'),
                    ],
                    'condition' => [
                        'arrow_position_maker' => 'custom'
                    ]
                ]
            );
            $this->add_responsive_control(
                'arrow_prev_top_position',
                [
                    'label' => esc_html__('Prev Top Position', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'range' => [
                        'px' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => 0,
                            'max' => 100,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-button-prev' => 'top: {{SIZE}}{{UNIT}}; bottom: unset;',
                    ],
                    'condition' => [
                        'arrow_prev_y_select' => 'top',
                        'arrow_position_maker' => 'custom'
                    ]
                ]
            );
            $this->add_responsive_control(
                'arrow_prev_bottom_position',
                [
                    'label' => esc_html__('Prev Bottom Position', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'range' => [
                        'px' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => 0,
                            'max' => 100,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-button-prev' => 'bottom: {{SIZE}}{{UNIT}}; top: unset;',
                    ],
                    'condition' => [
                        'arrow_prev_y_select' => 'bottom',
                        'arrow_position_maker' => 'custom'
                    ]
                ]
            );

            $this->add_responsive_control(
                'arrow_next_x_select',
                [
                    'label' => esc_html__('Next Position X', 'rsaddon'),
                    'type' => Controls_Manager::SELECT,
                    'default' => '',
                    'options' => [
                        '' => esc_html__('Default', 'rsaddon'),
                        'left' => esc_html__('Left', 'rsaddon'),
                        'right' => esc_html__('Right', 'rsaddon'),
                    ],
                    'condition' => [
                        'arrow_position_maker' => 'custom'
                    ]
                ]
            );
            $this->add_responsive_control(
                'arrow_next_left_position',
                [
                    'label' => esc_html__('Next Left Position', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'range' => [
                        'px' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => 0,
                            'max' => 100,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-button-next' => 'left: {{SIZE}}{{UNIT}}; right: unset;',
                    ],
                    'condition' => [
                        'arrow_next_x_select' => 'left',
                        'arrow_position_maker' => 'custom'
                    ]
                ]
            );
            $this->add_responsive_control(
                'arrow_next_right_position',
                [
                    'label' => esc_html__('Next Right Position', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'range' => [
                        'px' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => 0,
                            'max' => 100,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-button-next' => 'right: {{SIZE}}{{UNIT}}; left: unset;',
                    ],
                    'condition' => [
                        'arrow_next_x_select' => 'right',
                        'arrow_position_maker' => 'custom'
                    ]
                ]
            );

            $this->add_responsive_control(
                'arrow_next_y_select',
                [
                    'label' => esc_html__('Next Position Y', 'rsaddon'),
                    'type' => Controls_Manager::SELECT,
                    'default' => '',
                    'options' => [
                        '' => esc_html__('Default', 'rsaddon'),
                        'top' => esc_html__('Top', 'rsaddon'),
                        'bottom' => esc_html__('Bottom', 'rsaddon'),
                    ],
                    'condition' => [
                        'arrow_position_maker' => 'custom'
                    ]
                ]
            );
            $this->add_responsive_control(
                'arrow_next_top_position',
                [
                    'label' => esc_html__('Next Top Position', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'range' => [
                        'px' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => 0,
                            'max' => 100,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-button-next' => 'top: {{SIZE}}{{UNIT}}; bottom: unset;',
                    ],
                    'condition' => [
                        'arrow_next_y_select' => 'top',
                        'arrow_position_maker' => 'custom'
                    ]
                ]
            );
            $this->add_responsive_control(
                'arrow_next_bottom_position',
                [
                    'label' => esc_html__('Next Bottom Position', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'range' => [
                        'px' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => 0,
                            'max' => 100,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-button-next' => 'bottom: {{SIZE}}{{UNIT}}; top: unset;',
                    ],
                    'condition' => [
                        'arrow_next_y_select' => 'bottom',
                        'arrow_position_maker' => 'custom'
                    ]
                ]
            );
            // positioning end

            $this->add_control(
                'arrow_after_hr',
                [
                    'type' => \Elementor\Controls_Manager::DIVIDER,
                ]
            );

            $this->add_responsive_control(
                'navigation_arrow_width',
                [
                    'label' => esc_html__('Arrow Width', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-button-prev,
                        {{WRAPPER}} .rs-addon-slider .swiper-button-next' => 'width: {{SIZE}}{{UNIT}};',
                    ],
                ]
            );
            $this->add_responsive_control(
                'navigation_arrow_height',
                [
                    'label' => esc_html__('Arrow Height', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-button-prev,
                        {{WRAPPER}} .rs-addon-slider .swiper-button-next' => 'height: {{SIZE}}{{UNIT}}; line-height: {{SIZE}}{{UNIT}};',
                    ],
                ]
            );
            $this->add_responsive_control(
                'navigation_arrow_line_height',
                [
                    'label' => esc_html__('Arrow Line Height', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-button-prev,
                        {{WRAPPER}} .rs-addon-slider .swiper-button-next' => 'line-height: {{SIZE}}{{UNIT}} !important;',
                    ],
                ]
            );

            $this->add_group_control(
                Group_Control_Typography::get_type(),
                [
                    'name' => 'nav_icon_typography',
                    'label' => esc_html__('Icon Typography', 'rsaddon'),
                    'selector' => '
                        {{WRAPPER}} .rs-addon-slider .swiper-button-prev::after,
                        {{WRAPPER}} .rs-addon-slider .swiper-button-next::after
                    ',
                ]
            );

            $this->add_control(
                'arrow_border_radius_',
                [
                    'label' => esc_html__('Border Radius', 'rsaddon'),
                    'type' => Controls_Manager::DIMENSIONS,
                    'size_units' => ['px', '%', 'custom'],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-button-prev,
                        {{WRAPPER}} .rs-addon-slider .swiper-button-next' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ],
                ]
            );
            $this->add_control(
                'arrow_border_padding_',
                [
                    'label' => esc_html__('Padding', 'rsaddon'),
                    'type' => Controls_Manager::DIMENSIONS,
                    'size_units' => ['px', '%', 'custom'],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-button-prev,
                        {{WRAPPER}} .rs-addon-slider .swiper-button-next' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ],
                ]
            );

            // Arrow Hover Normal Tab Start
            $this->start_controls_tabs('_tabs_slider_arrow');
                // Normal Bullet Start
                $this->start_controls_tab(
                    'slider_arrow_normal_tab',
                    [
                        'label' => esc_html__('Normal', 'rsaddon'),
                    ]
                );
                    $this->add_control(
                        'navigation_arrow_color',
                        [
                            'label' => esc_html__('Icon Color', 'rsaddon'),
                            'type' => Controls_Manager::COLOR,
                            'selectors' => [
                                '{{WRAPPER}} .rs-addon-slider .swiper-button-prev::after,
                                {{WRAPPER}} .rs-addon-slider .swiper-button-next::after' => 'color: {{VALUE}};',
                            ],
                        ]
                    );
                    $this->add_group_control(
                        Group_Control_Background::get_type(),
                        [
                            'name' => 'navigation_arrow_background',
                            'types' => ['classic', 'gradient'],
                            'selector' => '
                                {{WRAPPER}} .rs-addon-slider .swiper-button-prev,
                                {{WRAPPER}} .rs-addon-slider .swiper-button-next
                            ',
                        ]
                    );

                    $this->add_group_control(
                        Group_Control_Border::get_type(),
                        [
                            'name' => 'nav_arrow_border',
                            'selector' => '
                                {{WRAPPER}} .rs-addon-slider .swiper-button-prev,
                                {{WRAPPER}} .rs-addon-slider .swiper-button-next
                            ',
                        ]
                    );
                    $this->add_group_control(
                        Group_Control_Box_Shadow::get_type(),
                        [
                            'name' => 'arrow_shadow_custom',
                            'selector' => '
                                {{WRAPPER}} .rs-addon-slider .swiper-button-prev,
                                {{WRAPPER}} .rs-addon-slider .swiper-button-next
                            ',
                        ]
                    );
                    $this->add_responsive_control(
                        'arrow_opacity',
                        [
                            'label' => esc_html__('Opacity', 'rsaddon'),
                            'type' => Controls_Manager::SLIDER,
                            'range' => [
                                'px' => [
                                    'min' => 0,
                                    'max' => 1,
                                    'step' => 0.1,
                                ],
                            ],
                            'selectors' => [
                                '{{WRAPPER}} .rs-addon-slider .swiper-button-prev,
                                {{WRAPPER}} .rs-addon-slider .swiper-button-next' => 'opacity: {{SIZE}}',
                            ]
                        ]
                    );
                $this->end_controls_tab();

                // Hover Bullet Start
                $this->start_controls_tab(
                    'slider_arrow_hover_tab',
                    [
                        'label' => esc_html__('Hover', 'rsaddon'),
                    ]
                );
                    $this->add_control(
                        'navigation_arrow_color_hover',
                        [
                            'label' => esc_html__('Icon Color', 'rsaddon'),
                            'type' => Controls_Manager::COLOR,
                            'selectors' => [
                                '{{WRAPPER}} .rs-addon-slider .swiper-button-prev:hover::after,
                                {{WRAPPER}} .rs-addon-slider .swiper-button-next:hover::after' => 'color: {{VALUE}};',
                            ],
                        ]
                    );
                    $this->add_group_control(
                        Group_Control_Background::get_type(),
                        [
                            'name' => 'navigation_arrow_background_hover',
                            'types' => ['classic', 'gradient'],
                            'selector' => '
                                {{WRAPPER}} .rs-addon-slider .swiper-button-prev:hover,
                                {{WRAPPER}} .rs-addon-slider .swiper-button-next:hover
                            ',
                        ]
                    );
                    $this->add_control(
                        'nav_arrow_border_hover',
                        [
                            'label' => esc_html__('Border Color', 'rsaddon'),
                            'type' => Controls_Manager::COLOR,
                            'selectors' => [
                                '{{WRAPPER}} .rs-addon-slider .swiper-button-prev:hover,
                                {{WRAPPER}} .rs-addon-slider .swiper-button-next:hover' => 'border-color: {{VALUE}};',
                            ],
                        ]
                    );
                    $this->add_responsive_control(
                        'arrow_opacity_hover',
                        [
                            'label' => esc_html__('Opacity', 'rsaddon'),
                            'type' => Controls_Manager::SLIDER,
                            'range' => [
                                'px' => [
                                    'min' => 0,
                                    'max' => 1,
                                    'step' => 0.1,
                                ],
                            ],
                            'selectors' => [
                                '{{WRAPPER}} .rsaddon-unique-slider .rs-addon-slider:hover .swiper-button-prev,
                                {{WRAPPER}} .rsaddon-unique-slider .rs-addon-slider:hover .swiper-button-next' => 'opacity: {{SIZE}}',
                            ]
                        ]
                    );
                $this->end_controls_tab();
            $this->end_controls_tabs();
            // Arrow Hover Normal Tab End
		$this->end_controls_section();
		// Arrow Style End

		// Bullet Style Start
		$this->start_controls_section(
			'section_slider_style_dots_ontrol',
			[
				'label' => esc_html__('Bullets Control', 'rsaddon'),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
					'slider_dots' => 'true',
                    'slider_bullet_type!' => ['progressbar', 'fraction']
				]
			]
		);
            $this->add_responsive_control(
                'dots_alignments',
                [
                    'label' => esc_html__('Alignment', 'rsaddon'),
                    'type' => Controls_Manager::CHOOSE,
                    'options' => [
                        'left' => [
                            'title' => esc_html__('Left', 'rsaddon'),
                            'icon' => 'eicon-text-align-left',
                        ],
                        'center' => [
                            'title' => esc_html__('Center', 'rsaddon'),
                            'icon' => 'eicon-text-align-center',
                        ],
                        'right' => [
                            'title' => esc_html__('Right', 'rsaddon'),
                            'icon' => 'eicon-text-align-right',
                        ],
                        'justify' => [
                            'title' => esc_html__('Justify', 'rsaddon'),
                            'icon' => 'eicon-text-align-justify',
                        ],
                    ],
                    'toggle' => true,
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination' => 'text-align: {{VALUE}}'
                    ],
                ]
            );
            $this->add_control(
                'bullet_wrapper_box_style',
                [
                    'label' => esc_html__('Dots Wrapper Box', 'rsaddon'),
                    'type' => Controls_Manager::HEADING,
                ]
            );
            $this->add_group_control(
                Group_Control_Background::get_type(),
                [
                    'name' => 'bullet_wrapper_box_bg',
                    'types' => ['classic', 'gradient'],
                    'selector' => '{{WRAPPER}} .rs-addon-slider .swiper-pagination',
                ]
            );
            $this->add_responsive_control(
                'bullet_wrapper_box_padding',
                [
                    'label' => esc_html__('Padding', 'rsaddon'),
                    'type' => Controls_Manager::DIMENSIONS,
                    'size_units' => ['px', '%', 'custom'],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ],
                ]
            );
            $this->add_responsive_control(
                'bullet_wrapper_box_margin',
                [
                    'label' => esc_html__('Margin', 'rsaddon'),
                    'type' => Controls_Manager::DIMENSIONS,
                    'size_units' => ['px', '%', 'custom'],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-bullet' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ],
                ]
            );
            $this->add_responsive_control(
                'bullet_wrapper_box_radius',
                [
                    'label' => esc_html__('Border Radius', 'rsaddon'),
                    'type' => Controls_Manager::DIMENSIONS,
                    'size_units' => ['px', '%', 'custom'],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-bullet' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ],
                ]
            );
            $this->add_responsive_control(
                'bullet_wrapper_width',
                [
                    'label' => esc_html__( 'Wrapper Width', 'rsaddon' ),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'range' => [
                        'px' => [
                            'min' => 0,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => 0,
                            'max' => 100,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination' => 'width: {{SIZE}}{{UNIT}};',
                    ],
                ]
            );
            $this->add_control(
                '_hr',
                [
                    'type' => Controls_Manager::DIVIDER,
                    'style' => 'thick',
                ]
            );
            $this->add_control(
                'bullet_item_options',
                [
                    'label' => esc_html__('Bullet Item Style', 'rsaddon'),
                    'type' => Controls_Manager::HEADING,
                ]
            );
            $this->start_controls_tabs('_tabs_slider_dots');
                // Normal Bullet Start
                $this->start_controls_tab(
                    'slider_dots_normal_tab',
                    [
                        'label' => esc_html__('Normal', 'rsaddon'),
                    ]
                );
                    $this->add_control(
                        'navigation_dot_inner_color',
                        [
                            'label' => esc_html__('Inner Dot Color', 'rsaddon'),
                            'type' => Controls_Manager::COLOR,
                            'condition' => [
                                'slider_dots_style' => '2',
                            ],
                            'selectors' => [
                                '{{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-bullet:after' => 'background: {{VALUE}}',
                            ],
                        ]
                    );
                    $this->add_responsive_control(
                        'bullet_inner_dot_height_custom',
                        [
                            'label' => esc_html__('Inner Dot Height', 'rsaddon'),
                            'type' => Controls_Manager::SLIDER,
                            'size_units' => ['px', '%', 'custom'],
                            'selectors' => [
                                '{{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-bullet:after' => 'height: {{SIZE}}{{UNIT}};',
                            ],
                            'condition' => [
                                'slider_dots_style' => '2',
                            ],
                        ]
                    );
                    $this->add_responsive_control(
                        'bullet_inner_dot_normal_width_custom',
                        [
                            'label' => esc_html__('Inner Dot Width', 'rsaddon'),
                            'type' => Controls_Manager::SLIDER,
                            'size_units' => ['px', '%', 'custom'],
                            'selectors' => [
                                '{{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-bullet:after' => 'width: {{SIZE}}{{UNIT}};',
                            ],
                            'condition' => [
                                'slider_dots_style' => '2',
                            ],
                        ]
                    );
                    $this->add_responsive_control(
                        'bullet_inner_dot_border_radius',
                        [
                            'label' => esc_html__('Inner Dot Radius', 'rsaddon'),
                            'type' => Controls_Manager::SLIDER,
                            'size_units' => ['px', '%', 'custom'],
                            'selectors' => [
                                '{{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-bullet:after' => 'border-radius: {{SIZE}}{{UNIT}};',
                            ],
                            'condition' => [
                                'slider_dots_style' => '2',
                            ],
                        ]
                    );
                    $this->add_group_control(
                        Group_Control_Background::get_type(),
                        [
                            'name'     => 'navigation_dot_icon_background',
                            'selector' => '{{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-bullet',
                        ]
                    );
                    $this->add_responsive_control(
                        'bullet_height_custom',
                        [
                            'label' => esc_html__('Bullet Height', 'rsaddon'),
                            'type' => Controls_Manager::SLIDER,
                            'size_units' => ['px', '%', 'custom'],
                            'selectors' => [
                                '{{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-bullet' => 'height: {{SIZE}}{{UNIT}};',
                            ],
                        ]
                    );
                    $this->add_responsive_control(
                        'bullet_normal_width_custom',
                        [
                            'label' => esc_html__('Bullet Width', 'rsaddon'),
                            'type' => Controls_Manager::SLIDER,
                            'size_units' => ['px', '%', 'custom'],
                            'selectors' => [
                                '{{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-bullet' => 'width: {{SIZE}}{{UNIT}};',
                            ],
                        ]
                    );
                    $this->add_control(
                        'bullet_border_radius_custom',
                        [
                            'label' => esc_html__('Border Radius', 'rsaddon'),
                            'type' => Controls_Manager::DIMENSIONS,
                            'size_units' => ['px', '%', 'custom'],
                            'selectors' => [
                                '{{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-bullet' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                            ],
                        ]
                    );
                    $this->add_group_control(
                        Group_Control_Border::get_type(),
                        [
                            'name' => 'bullet_border_custom',
                            'selector' => '{{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-bullet',
                        ]
                    );
                    $this->add_group_control(
                        Group_Control_Box_Shadow::get_type(),
                        [
                            'name' => 'bullet_shadow_custom',
                            'selector' => '{{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-bullet'
                        ]
                    );
                $this->end_controls_tab();
                // Normal Bullet End

                // Active Bullet Start
                $this->start_controls_tab(
                    'slider_dots_active_tab',
                    [
                        'label' => esc_html__('Active', 'rsaddon'),
                    ]
                );
                    $this->add_control(
                        'navigation_dot_inner_color_active',
                        [
                            'label' => esc_html__('Inner Dot Color', 'rsaddon'),
                            'type' => Controls_Manager::COLOR,
                            'condition' => [
                                'slider_dots_style' => '2',
                            ],
                            'selectors' => [
                                '{{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-bullet:hover:after,
                                {{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-bullet.swiper-pagination-bullet-active:after' => 'background: {{VALUE}}',
                            ],
                        ]
                    );
                    $this->add_responsive_control(
                        'bullet_inner_dot_height_custom_active',
                        [
                            'label' => esc_html__('Inner Dot Height', 'rsaddon'),
                            'type' => Controls_Manager::SLIDER,
                            'size_units' => ['px', '%', 'custom'],
                            'selectors' => [
                                '{{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-bullet:hover:after,
                                {{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-bullet:after' => 'height: {{SIZE}}{{UNIT}};',
                            ],
                            'condition' => [
                                'slider_dots_style' => '2',
                            ],
                        ]
                    );
                    $this->add_responsive_control(
                        'bullet_inner_dot_active_width_custom',
                        [
                            'label' => esc_html__('Inner Dot Width', 'rsaddon'),
                            'type' => Controls_Manager::SLIDER,
                            'size_units' => ['px', '%', 'custom'],
                            'selectors' => [
                                '{{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-bullet:hover:after,
                                {{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-bullet:after' => 'width: {{SIZE}}{{UNIT}};',
                            ],
                            'condition' => [
                                'slider_dots_style' => '2',
                            ],
                        ]
                    );
                    $this->add_group_control(
                        Group_Control_Background::get_type(),
                        [
                            'name'     => 'navigation_dot_icon_background_active',
                            'selector' => '{{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-bullet:hover, {{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-bullet.swiper-pagination-bullet-active',
                        ]
                    );
                    $this->add_responsive_control(
                        'bullet_active_width_custom',
                        [
                            'label' => esc_html__('Bullet Width', 'rsaddon'),
                            'type' => Controls_Manager::SLIDER,
                            'size_units' => ['px', '%', 'custom'],
                            'selectors' => [
                                '{{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-bullet.swiper-pagination-bullet-active' => 'width: {{SIZE}}{{UNIT}};',
                            ],
                        ]
                    );
                    $this->add_responsive_control(
                        'bullet_active_height_custom',
                        [
                            'label' => esc_html__('Bullet Height', 'rsaddon'),
                            'type' => Controls_Manager::SLIDER,
                            'size_units' => ['px', '%', 'custom'],
                            'selectors' => [
                                '{{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-bullet.swiper-pagination-bullet-active' => 'height: {{SIZE}}{{UNIT}};',
                            ],
                        ]
                    );
                    $this->add_responsive_control(
                        'bullet_active_scale_custom',
                        [
                            'label' => esc_html__('Bullet Scale', 'rsaddon'),
                            'type' => Controls_Manager::SLIDER,
                            'range' => [
                                'px' => [
                                    'min' => 0,
                                    'max' => 1000,
                                    'step' => 0.1,
                                ],
                            ],
                            'selectors' => [
                                '{{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-bullet.swiper-pagination-bullet-active' => 'transform: scale({{SIZE}})',
                            ],
                        ]
                    );
                    $this->add_control(
                        'navigation_dot_active_border_color',
                        [
                            'label' => esc_html__('Border Color', 'rsaddon'),
                            'type' => Controls_Manager::COLOR,
                            'selectors' => [
                                '{{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-bullet:hover' => 'border-color: {{VALUE}};',
                                '{{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-bullet.swiper-pagination-bullet-active' => 'border-color: {{VALUE}};',

                            ],
                        ]
                    );
                $this->end_controls_tab();
            $this->end_controls_tabs();
            // Active Bullet End
            $this->add_responsive_control(
                'bullet_spacing_custom_position',
                [
                    'label' => esc_html__('Top Position', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'show_label' => true,
                    'range' => [
                        'px' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                    ],
                    'separator' => 'before',
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination' => 'top: {{SIZE}}{{UNIT}} !important; bottom: unset !important;',
                    ],
                ]
            );
            $this->add_responsive_control(
                'bullet_spacing_custom_position_bottom',
                [
                    'label' => esc_html__('Bottom Position', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'show_label' => true,
                    'range' => [
                        'px' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                    ],
                    'default' => [
                        'size' => 0,
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination' => 'bottom: {{SIZE}}{{UNIT}} !important; top: unset !important;',
                    ],
                ]
            );
		$this->end_controls_section();

        // Progress Pagination
		$this->start_controls_section(
			'section_slider_style_dots_progress',
			[
				'label' => esc_html__('Bullet Progress Control', 'rsaddon'),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
					'slider_dots' => 'true',
                    'slider_bullet_type' => 'progressbar'
				]
			]
		);
            $this->add_control(
                'dots_progress_control_heading',
                [
                    'label' => esc_html__( 'Progress Options', 'rsaddon' ),
                    'type' => Controls_Manager::HEADING
                ]
            );
            $this->add_responsive_control(
                'dots_progress_width',
                [
                    'label' => esc_html__( 'Width', 'rsaddon' ),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'range' => [
                        'px' => [
                            'min' => 0,
                            'max' => 1000
                        ],
                        '%' => [
                            'min' => 0,
                            'max' => 100,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination' => 'width: {{SIZE}}{{UNIT}} !important;',
                    ],
                ]
            );
            $this->add_responsive_control(
                'dots_progress_height',
                [
                    'label' => esc_html__( 'Height', 'rsaddon' ),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'range' => [
                        'px' => [
                            'min' => 0,
                            'max' => 1000
                        ],
                        '%' => [
                            'min' => 0,
                            'max' => 100,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination' => 'height: {{SIZE}}{{UNIT}} !important;',
                    ],
                ]
            );
            $this->add_control(
                'dots_progress_track_color',
                [
                    'label' => esc_html__( 'Track Background Color', 'rsaddon' ),
                    'type' => Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination' => 'background-color: {{VALUE}}',
                    ],
                ]
            );
            $this->add_control(
                'dots_progress_color',
                [
                    'label' => esc_html__( 'Progress Color', 'rsaddon' ),
                    'type' => Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-progressbar-fill' => 'background-color: {{VALUE}}',
                    ],
                ]
            );
            $this->add_responsive_control(
                'dots_progress_radius',
                [
                    'label' => esc_html__( 'Border Radius', 'rsaddon' ),
                    'type' => Controls_Manager::DIMENSIONS,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ],
                ]
            );
            $this->add_group_control(
                Group_Control_Border::get_type(),
                [
                    'name' => 'dots_progress_border',
                    'selector' => '{{WRAPPER}} .rs-addon-slider .swiper-pagination',
                ]
            );
            $this->add_group_control(
                Group_Control_Box_Shadow::get_type(),
                [
                    'name' => 'dots_progress_box_shadow',
                    'selector' => '{{WRAPPER}} .rs-addon-slider .swiper-pagination',
                ]
            );

            // Position Control
            $this->add_control(
                'dots_progress_control_position_heading',
                [
                    'label' => esc_html__( 'Position Options', 'rsaddon' ),
                    'type' => Controls_Manager::HEADING,
                    'separator' => 'before',
                ]
            );
            $this->add_responsive_control(
                'dots_progress_position_top',
                [
                    'label' => esc_html__( 'Position Top', 'rsaddon' ),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'range' => [
                        'px' => [
                            'min' => 0,
                            'max' => 1000
                        ],
                        '%' => [
                            'min' => 0,
                            'max' => 100,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination' => 'top: {{SIZE}}{{UNIT}} !important; bottom: unset !important;',
                    ],
                ]
            );
            $this->add_responsive_control(
                'dots_progress_position_right',
                [
                    'label' => esc_html__( 'Position Right', 'rsaddon' ),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'range' => [
                        'px' => [
                            'min' => 0,
                            'max' => 1000
                        ],
                        '%' => [
                            'min' => 0,
                            'max' => 100,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination' => 'right: {{SIZE}}{{UNIT}} !important; left: unset !important;',
                    ],
                ]
            );
            $this->add_responsive_control(
                'dots_progress_position_bottom',
                [
                    'label' => esc_html__( 'Position Bottom', 'rsaddon' ),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'range' => [
                        'px' => [
                            'min' => 0,
                            'max' => 1000
                        ],
                        '%' => [
                            'min' => 0,
                            'max' => 100,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination' => 'bottom: {{SIZE}}{{UNIT}} !important; top: unset !important;',
                    ],
                ]
            );
            $this->add_responsive_control(
                'dots_progress_position_left',
                [
                    'label' => esc_html__( 'Position Left', 'rsaddon' ),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'range' => [
                        'px' => [
                            'min' => 0,
                            'max' => 1000
                        ],
                        '%' => [
                            'min' => 0,
                            'max' => 100,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination' => 'left: {{SIZE}}{{UNIT}} !important; right: unset !important;',
                    ],
                ]
            );
        $this->end_controls_section();

        // Fraction Pagination
		$this->start_controls_section(
			'section_slider_style_dots_fraction',
			[
				'label' => esc_html__('Bullet Fraction Control', 'rsaddon'),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
					'slider_dots' => 'true',
                    'slider_bullet_type' => 'fraction'
				]
			]
		);
            $this->add_responsive_control(
                'dots_fraction_wrapper_alignments',
                [
                    'label' => esc_html__('Alignment', 'rsaddon'),
                    'type' => Controls_Manager::CHOOSE,
                    'options' => [
                        'left' => [
                            'title' => esc_html__('Left', 'rsaddon'),
                            'icon' => 'eicon-text-align-left',
                        ],
                        'center' => [
                            'title' => esc_html__('Center', 'rsaddon'),
                            'icon' => 'eicon-text-align-center',
                        ],
                        'right' => [
                            'title' => esc_html__('Right', 'rsaddon'),
                            'icon' => 'eicon-text-align-right',
                        ],
                        'justify' => [
                            'title' => esc_html__('Justify', 'rsaddon'),
                            'icon' => 'eicon-text-align-justify',
                        ],
                    ],
                    'toggle' => true,
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination' => 'text-align: {{VALUE}}'
                    ],
                ]
            );
            $this->add_group_control(
                Group_Control_Typography::get_type(),
                [
                    'name' => 'dots_fraction_typography',
                    'selector' => '{{WRAPPER}} .rs-addon-slider .swiper-pagination',
                ]
            );
            $this->add_control(
                'dots_fraction_text_color',
                [
                    'label' => esc_html__( 'Text Color', 'rsaddon' ),
                    'type' => Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination' => 'color: {{VALUE}}',
                    ],
                ]
            );
            $this->add_control(
                'dots_fraction_text_color_current',
                [
                    'label' => esc_html__( 'Text Color (Current)', 'rsaddon' ),
                    'type' => Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination .swiper-pagination-current' => 'color: {{VALUE}}',
                    ],
                ]
            );

            $this->add_responsive_control(
                'dots_fraction_wrapper_width',
                [
                    'label' => esc_html__('Width', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'show_label' => true,
                    'range' => [
                        'px' => [
                            'min' => 0,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => 0,
                            'max' => 1000,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination' => 'width: {{SIZE}}{{UNIT}};',
                    ],
                ]
            );
            $this->add_responsive_control(
                'dots_fraction_wrapper_height',
                [
                    'label' => esc_html__('Height', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'show_label' => true,
                    'range' => [
                        'px' => [
                            'min' => 0,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => 0,
                            'max' => 1000,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination' => 'height: {{SIZE}}{{UNIT}};',
                    ],
                ]
            );
            $this->add_responsive_control(
                'dots_fraction_wrapper_padding',
                [
                    'label' => esc_html__( 'Padding', 'rsaddon' ),
                    'type' => Controls_Manager::DIMENSIONS,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ],
                ]
            );
            $this->add_responsive_control(
                'dots_fraction_wrapper_radius',
                [
                    'label' => esc_html__( 'Border Radius', 'rsaddon' ),
                    'type' => Controls_Manager::DIMENSIONS,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ],
                ]
            );
            $this->add_group_control(
                Group_Control_Background::get_type(),
                [
                    'name' => 'dots_fraction_wrapper_background',
                    'types' => [ 'classic', 'gradient' ],
                    'selector' => '{{WRAPPER}} .rs-addon-slider .swiper-pagination',
                ]
            );
            $this->add_group_control(
                Group_Control_Border::get_type(),
                [
                    'name' => 'dots_fraction_wrapper_border',
                    'selector' => '{{WRAPPER}} .rs-addon-slider .swiper-pagination',
                ]
            );
            $this->add_group_control(
                Group_Control_Box_Shadow::get_type(),
                [
                    'name' => 'dots_fraction_wrapper_box_shadow',
                    'selector' => '{{WRAPPER}} .rs-addon-slider .swiper-pagination',
                ]
            );

            // Position Control
            $this->add_control(
                'dots_fraction_control_position_heading',
                [
                    'label' => esc_html__( 'Position Options', 'rsaddon' ),
                    'type' => Controls_Manager::HEADING,
                    'separator' => 'before',
                ]
            );
            $this->add_responsive_control(
                'dots_fraction_position_top',
                [
                    'label' => esc_html__('Top Position', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'show_label' => true,
                    'range' => [
                        'px' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination' => 'top: {{SIZE}}{{UNIT}} !important; bottom: unset !important;',
                    ],
                ]
            );
            $this->add_responsive_control(
                'dots_fraction_position_right',
                [
                    'label' => esc_html__('Right Position', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'show_label' => true,
                    'range' => [
                        'px' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination' => 'right: {{SIZE}}{{UNIT}} !important; left: unset !important;',
                    ],
                ]
            );
            $this->add_responsive_control(
                'dots_fraction_position_bottom',
                [
                    'label' => esc_html__('Bottom Position', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'show_label' => true,
                    'range' => [
                        'px' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination' => 'bottom: {{SIZE}}{{UNIT}} !important; top: unset !important;',
                    ],
                ]
            );
            $this->add_responsive_control(
                'dots_fraction_position_left',
                [
                    'label' => esc_html__('Left Position', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'show_label' => true,
                    'range' => [
                        'px' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-pagination' => 'left: {{SIZE}}{{UNIT}} !important; right: unset !important;',
                    ],
                ]
            );
        $this->end_controls_section();
		// Bullet Style End

        // Autoplay Progress Start
		$this->start_controls_section(
			'section_slider_autoplay_progress',
			[
				'label' => esc_html__('Autoplay Progress Control', 'rsaddon'),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
					'slider_autoplay' => 'true',
                    'slide_item_circle_progress' => 'true'
				]
			]
		);
            $this->add_control(
                'autoplay_progress_circle_heading',
                [
                    'label' => esc_html__( 'Circle Options', 'rsaddon' ),
                    'type' => Controls_Manager::HEADING
                ]
            );
            $this->add_responsive_control(
                'autoplay_progress_size',
                [
                    'label' => esc_html__( 'Size', 'rsaddon' ),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'range' => [
                        'px' => [
                            'min' => 0,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => 0,
                            'max' => 100,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .autoplay-progress' => 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};',
                    ],
                ]
            );
            $this->add_responsive_control(
                'autoplay_progress_stroke_width',
                [
                    'label' => esc_html__( 'Stroke Width', 'rsaddon' ),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'range' => [
                        'px' => [
                            'min' => 0,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => 0,
                            'max' => 100,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .autoplay-progress svg' => 'stroke-width: {{SIZE}}{{UNIT}};',
                    ],
                ]
            );
            $this->add_control(
                'autoplay_progress_stroke_color',
                [
                    'label' => esc_html__( 'Stroke Color', 'rsaddon' ),
                    'type' => Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .autoplay-progress svg' => 'stroke: {{VALUE}}',
                    ],
                ]
            );
            $this->add_control(
                'autoplay_progress_stroke_color_solid',
                [
                    'label' => esc_html__( 'Stroke Color (Solid)', 'rsaddon' ),
                    'type' => Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .autoplay-progress svg circle.normal' => 'stroke: {{VALUE}}',
                    ],
                ]
            );
            $this->add_control(
                'autoplay_progress_bg_color',
                [
                    'label' => esc_html__( 'Background Color', 'rsaddon' ),
                    'type' => Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .autoplay-progress svg' => 'fill: {{VALUE}}',
                    ],
                ]
            );

            // Number Control
            $this->add_control(
                'autoplay_progress_number_heading',
                [
                    'label' => esc_html__( 'Number Options', 'rsaddon' ),
                    'type' => Controls_Manager::HEADING,
                    'separator' => 'before',
                ]
            );
            $this->add_group_control(
                Group_Control_Typography::get_type(),
                [
                    'name' => 'autoplay_progress_number_typography',
                    'selector' => '{{WRAPPER}} .rs-addon-slider .autoplay-progress',
                ]
            );
            $this->add_control(
                'autoplay_progress_number_color',
                [
                    'label' => esc_html__( 'Text Color', 'rsaddon' ),
                    'type' => Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .autoplay-progress' => 'color: {{VALUE}}',
                    ],
                ]
            );

            // Position Control
            $this->add_control(
                'autoplay_progress_position_heading',
                [
                    'label' => esc_html__( 'Position Options', 'rsaddon' ),
                    'type' => Controls_Manager::HEADING,
                    'separator' => 'before',
                ]
            );
            $this->add_responsive_control(
                'autoplay_progress_position_top',
                [
                    'label' => esc_html__('Top Position', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'show_label' => true,
                    'range' => [
                        'px' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .autoplay-progress' => 'top: {{SIZE}}{{UNIT}} !important; bottom: unset !important;',
                    ],
                ]
            );
            $this->add_responsive_control(
                'autoplay_progress_position_right',
                [
                    'label' => esc_html__('Right Position', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'show_label' => true,
                    'range' => [
                        'px' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .autoplay-progress' => 'right: {{SIZE}}{{UNIT}} !important; left: unset !important;',
                    ],
                ]
            );
            $this->add_responsive_control(
                'autoplay_progress_position_bottom',
                [
                    'label' => esc_html__('Bottom Position', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'show_label' => true,
                    'range' => [
                        'px' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .autoplay-progress' => 'bottom: {{SIZE}}{{UNIT}} !important; top: unset !important;',
                    ],
                ]
            );
            $this->add_responsive_control(
                'autoplay_progress_position_left',
                [
                    'label' => esc_html__('Left Position', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'show_label' => true,
                    'range' => [
                        'px' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .autoplay-progress' => 'left: {{SIZE}}{{UNIT}} !important; right: unset !important;',
                    ],
                ]
            );
        $this->end_controls_section();
        // Autoplay Progress End

        // Scrollbar Start
		$this->start_controls_section(
			'section_slider_scrollbar',
			[
				'label' => esc_html__('Scrollbar Control', 'rsaddon'),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
					'slider_scrollbar' => 'true'
				]
			]
		);
            $this->add_responsive_control(
                'scrollbar_width',
                [
                    'label' => esc_html__( 'Width', 'rsaddon' ),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'range' => [
                        'px' => [
                            'min' => 0,
                            'max' => 1000
                        ],
                        '%' => [
                            'min' => 0,
                            'max' => 100,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-scrollbar' => 'width: {{SIZE}}{{UNIT}} !important;',
                    ],
                ]
            );
            $this->add_responsive_control(
                'scrollbar_height',
                [
                    'label' => esc_html__( 'Height', 'rsaddon' ),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'range' => [
                        'px' => [
                            'min' => 0,
                            'max' => 1000
                        ],
                        '%' => [
                            'min' => 0,
                            'max' => 100,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-scrollbar' => 'height: {{SIZE}}{{UNIT}} !important;',
                    ],
                ]
            );
            $this->add_control(
                'scrollbar_track_color',
                [
                    'label' => esc_html__( 'Track Background Color', 'rsaddon' ),
                    'type' => Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-scrollbar' => 'background-color: {{VALUE}}',
                    ],
                ]
            );
            $this->add_control(
                'scrollbar_color',
                [
                    'label' => esc_html__( 'Scrollbar Color', 'rsaddon' ),
                    'type' => Controls_Manager::COLOR,
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-scrollbar .swiper-scrollbar-drag' => 'background-color: {{VALUE}}',
                    ],
                ]
            );
            $this->add_responsive_control(
                'scrollbar_margin',
                [
                    'label' => esc_html__( 'Margin', 'rsaddon' ),
                    'type' => Controls_Manager::DIMENSIONS,
                    'size_units' => [ 'px', '%', 'custom' ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-scrollbar' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ],
                ]
            );
            $this->add_group_control(
                Group_Control_Border::get_type(),
                [
                    'name' => 'scrollbar_border',
                    'selector' => '{{WRAPPER}} .rs-addon-slider .swiper-scrollbar',
                ]
            );
            $this->add_group_control(
                Group_Control_Box_Shadow::get_type(),
                [
                    'name' => 'scrollbar_box_shadow',
                    'selector' => '{{WRAPPER}} .rs-addon-slider .swiper-scrollbar',
                ]
            );
            // Position Control
            $this->add_control(
                'scrollbar_position_heading',
                [
                    'label' => esc_html__( 'Position Options', 'rsaddon' ),
                    'type' => Controls_Manager::HEADING,
                    'separator' => 'before',
                ]
            );
            $this->add_responsive_control(
                'scrollbar_position_top',
                [
                    'label' => esc_html__('Top Position', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'show_label' => true,
                    'range' => [
                        'px' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-scrollbar' => 'top: {{SIZE}}{{UNIT}} !important; bottom: unset !important;',
                    ],
                ]
            );
            $this->add_responsive_control(
                'scrollbar_position_right',
                [
                    'label' => esc_html__('Right Position', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'show_label' => true,
                    'range' => [
                        'px' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-scrollbar' => 'right: {{SIZE}}{{UNIT}} !important; left: unset !important;',
                    ],
                ]
            );
            $this->add_responsive_control(
                'scrollbar_position_bottom',
                [
                    'label' => esc_html__('Bottom Position', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'show_label' => true,
                    'range' => [
                        'px' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-scrollbar' => 'bottom: {{SIZE}}{{UNIT}} !important; top: unset !important;',
                    ],
                ]
            );
            $this->add_responsive_control(
                'scrollbar_position_left',
                [
                    'label' => esc_html__('Left Position', 'rsaddon'),
                    'type' => Controls_Manager::SLIDER,
                    'size_units' => ['px', '%', 'custom'],
                    'show_label' => true,
                    'range' => [
                        'px' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                        '%' => [
                            'min' => -1000,
                            'max' => 1000,
                        ],
                    ],
                    'selectors' => [
                        '{{WRAPPER}} .rs-addon-slider .swiper-scrollbar' => 'left: {{SIZE}}{{UNIT}} !important; right: unset !important;',
                    ],
                ]
            );
        $this->end_controls_section();
        // Scrollbar End

    }

    protected function render()
    {

        $settings = $this->get_settings_for_display();
        $clip_path_enable     = ('yes' == $settings['right_clip_path_enable']) ? 'clip-path-css' : '';
        $id = $this->get_id();
        $unique = rand(2012, 35120);
        $sliderSpeed           = !empty($settings['slider_speed']) ? $settings['slider_speed'] : 300;
        $interval              = $settings['slider_interval'];
        $slidesToScroll        = $settings['slides_ToScroll'];
        $slider_autoplay       = $settings['slider_autoplay'] === 'true' ? 'true' : 'false';
        $pauseOnHover          = $settings['slider_stop_on_hover'] === 'true' ? 'true' : 'false';
        $sliderDots            = $settings['slider_dots'] == 'true' ? 'true' : 'false';
        $sliderNav             = $settings['slider_nav'] == 'true' ? 'true' : 'false';
        $infinite              = $settings['slider_loop'] === 'true' ? 'true' : 'false';
        $centerMode            = $settings['slider_centerMode'] === 'true' ? 'true' : 'false';
        $freeMode              = $settings['slider_free_mode'] === 'true' ? 'true' : 'false';
        $grabCursor            = $settings['slider_grab_cursor'] === 'true' ? 'true' : 'false';
        $mousewheel            = $settings['slider_mousewheel'] === 'true' ? 'true' : 'false';
        $autoHeight            = $settings['slider_auto_height'] === 'true' ? 'true' : 'false';
        $keyboardControl       = $settings['slider_keyboard_control'] === 'true' ? 'true' : 'false';            
        $dynamicBullets        = $settings['slider_dynamic_bullets'] === 'true' ? 'true' : 'false';
        $slideEffect           = !empty($settings['slider_effect']) ? $settings['slider_effect'] : '';
        $bulletType            = !empty($settings['slider_bullet_type']) ? $settings['slider_bullet_type'] : '';
        $col_desktop           = $settings['col_desktop'];
        $col_lg                = $settings['col_lg'];
        $col_md                = $settings['col_md'];
        $col_sm                = $settings['col_sm'];
        $col_xs                = $settings['col_xs'];
        $spaceBetween          = !empty($settings['slide_space_between']['size']) ? $settings['slide_space_between']['size'] : 0;
        $spaceBetweenLg        = !empty($settings['slide_space_between_lg']['size']) ? $settings['slide_space_between_lg']['size'] : 0;
        $spaceBetweenMd        = !empty($settings['slide_space_between_md']['size']) ? $settings['slide_space_between_md']['size'] : 0;
        $spaceBetweenSm        = !empty($settings['slide_space_between_sm']['size']) ? $settings['slide_space_between_sm']['size'] : 0;
        $spaceBetweenXs        = !empty($settings['slide_space_between_xs']['size']) ? $settings['slide_space_between_xs']['size'] : 0;

        $slider_conf = compact('spaceBetween', 'spaceBetweenLg', 'spaceBetweenMd', 'spaceBetweenSm', 'spaceBetweenXs', 'sliderSpeed','interval', 'slidesToScroll', 'slider_autoplay', 'pauseOnHover', 'sliderDots', 'sliderNav', 'infinite', 'centerMode', 'col_desktop', 'col_lg', 'col_md', 'col_sm', 'col_xs', 'freeMode', 'grabCursor', 'mousewheel', 'autoHeight', 'keyboardControl', 'dynamicBullets', 'bulletType', 'slideEffect');

        $rtl = ('right' === $settings['slider_direction']) ? 'true' : 'false';
        $slideItem = 0;
        $container = ('box' === $settings['container_type_setting']) ? 'rs-e-container' : '';

        // Layer Animation Classes
        function rs_getAnimationClass($animationSetting) {
            return (!empty($animationSetting) && $animationSetting !== 'none') 
                ? 'animated ' . $animationSetting 
                : '';
        }
        $subTitleAnimation = rs_getAnimationClass($settings['sub_title_animation']);
        $titleAnimation = rs_getAnimationClass($settings['title_animation']);
        $descAnimation = rs_getAnimationClass($settings['desc_animation']);
        $imgAnimation = rs_getAnimationClass($settings['img_animation']);
        $btnOneAnimation = rs_getAnimationClass($settings['btn_one_animation']);
        $btnTwoAnimation = rs_getAnimationClass($settings['btn_two_animation']);

        // Animation Timing Function
        function rs_generateAnimationStyle($delay, $duration) {
            $style = '';
            if (!empty($delay)) {
                $style .= 'animation-delay:' . $delay . ';';
            }
            if (!empty($duration)) {
                $style .= 'animation-duration:' . $duration . ';';
            }
            return !empty($style) ? 'style=' . $style : '';
        }
        
        $subTitleAnimationDelay = !empty($settings['sub_title_animation_delay']) ? $settings['sub_title_animation_delay'].'ms' : '';
        $subTitleAnimationDuration = !empty($settings['sub_title_animation_duration']) ? $settings['sub_title_animation_duration'].'ms' : '';
        $titleAnimationDelay = !empty($settings['title_animation_delay']) ? $settings['title_animation_delay'].'ms' : '';
        $titleAnimationDuration = !empty($settings['title_animation_duration']) ? $settings['title_animation_duration'].'ms' : '';
        $descAnimationDelay = !empty($settings['desc_animation_delay']) ? $settings['desc_animation_delay'].'ms' : '';
        $descAnimationDuration = !empty($settings['desc_animation_duration']) ? $settings['desc_animation_duration'].'ms' : '';
        $imgAnimationDelay = !empty($settings['img_animation_delay']) ? $settings['img_animation_delay'].'ms' : '';
        $imgAnimationDuration = !empty($settings['img_animation_duration']) ? $settings['img_animation_duration'].'ms' : '';
        $btnOneAnimationDelay = !empty($settings['btn_one_animation_delay']) ? $settings['btn_one_animation_delay'].'ms' : '';
        $btnOneAnimationDuration = !empty($settings['btn_one_animation_duration']) ? $settings['btn_one_animation_duration'].'ms' : '';
        $btnTwoAnimationDelay = !empty($settings['btn_two_animation_delay']) ? $settings['btn_two_animation_delay'].'ms' : '';
        $btnTwoAnimationDuration = !empty($settings['btn_two_animation_duration']) ? $settings['btn_two_animation_duration'].'ms' : '';
        
        // Generated Animation styles
        $subTitleAnimationTiming = rs_generateAnimationStyle($subTitleAnimationDelay, $subTitleAnimationDuration);
        $titleAnimationTiming = rs_generateAnimationStyle($titleAnimationDelay, $titleAnimationDuration);
        $descAnimationTiming = rs_generateAnimationStyle($descAnimationDelay, $descAnimationDuration);
        $imgAnimationTiming = rs_generateAnimationStyle($imgAnimationDelay, $imgAnimationDuration);
        $btnOneAnimationTiming = rs_generateAnimationStyle($btnOneAnimationDelay, $btnOneAnimationDuration);
        $btnTwoAnimationTiming = rs_generateAnimationStyle($btnTwoAnimationDelay, $btnTwoAnimationDuration);

        ?>
        <?php

        if (empty($settings['slider_list'])) {
            return;
        }

?>
    <div id="rs-unique-slider-<?php echo esc_attr($unique); ?>" class="rsaddon-unique-slider">
        <div class="swiper swiper-<?php echo esc_attr($unique); ?> rs-addon-slider rs-hero-slider nav-icon-<?php echo esc_attr($settings['slider_nav_icon_style']); ?> slick-dots-<?php echo esc_attr($settings['slider_dots_style']); ?>" dir="<?php echo esc_attr(('true' === $rtl) ? 'rtl' : ''); ?>">
            <div class="swiper-wrapper">
                <?php foreach ($settings['slider_list'] as $index => $item) :
                $slideItem++;
                $subTitle             = !empty($item['sub_title']) ? $item['sub_title'] : '';
                $title                = !empty($item['title']) ? $item['title'] : '';
                $description          = !empty($item['description']) ? $item['description'] : '';
                $btn_txt              = !empty($item['btn_txt']) ? $item['btn_txt'] : '';
                $btn_link             = !empty($item['btn_link']['url']) ? $item['btn_link']['url'] : '#';
                $target               = $item['btn_link']['is_external'] ? 'target=_blank' : '';
                $btn_txt2             = !empty($item['btn_txt2']) ? $item['btn_txt2'] : '';
                $btn_link2            = !empty($item['btn_link2']['url']) ? $item['btn_link2']['url'] : '#';
                $target2              = $item['btn_link2']['is_external'] ? 'target=_blank' : '';
                $layer_image          = wp_get_attachment_image_url( $item['layer_image']['id'], $settings['thumbnail_size'] );

                if ('templates' === $item['slider_type']) {
                    $id = $item['template'];                     
                    $template_id = $id;
                    ?>
                    <div class="swiper-slide item-<?php echo esc_attr($slideItem); ?> elementor-repeater-item-<?php echo esc_attr( $item['_id'] ); ?>">
                        <?php if ('rs-e-container' === $container) { ?>
                            <div class="<?php echo esc_attr( $container ); ?>">
                        <?php } ?>
                            <div class="slider-inner <?php echo esc_attr( $clip_path_enable ); ?>">
                                <?php if ( class_exists( '\Elementor\Plugin' ) ) {
                                    if ( \Elementor\Plugin::$instance->db->is_built_with_elementor( $template_id ) ) {
                                        echo \Elementor\Plugin::$instance->frontend->get_builder_content( $template_id );
                                    } else {
                                        echo esc_html__('Elementor is not enabled for this template ID.', 'rsaddon');
                                    }
                                } ?>
                            </div>
                        <?php if ('rs-e-container' === $container) { ?>
                            </div>
                        <?php } ?>
                    </div>
                <?php } else {
                    include plugin_dir_path(__FILE__) . "/style1.php";
                }

                endforeach; ?>
            </div>

            <?php if ('true' === $settings['slider_nav']) { ?>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            <?php }
            if ('true' === $settings['slider_dots']) { ?>
                <div class="swiper-pagination"></div>
            <?php }
            if ('true' === $settings['slider_scrollbar']) { ?>
                <div class="swiper-scrollbar"></div>
            <?php }
            if ('true' === $settings['slide_item_circle_progress']) { ?>
                <div class="autoplay-progress">
                    <svg viewBox="0 0 48 48">
                        <circle class="normal" cx="24" cy="24" r="20"></circle>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span></span>
                </div>
            <?php } ?>
        </div>
        <div class="rsaddon-slider-conf d-none" data-conf="<?php echo htmlspecialchars(json_encode($slider_conf)); ?>"></div>

        <script>
            jQuery(document).ready(function($) {
                $('#rs-unique-slider-<?php echo esc_attr($unique); ?>').each(function() {
                    var $slider = $(this);
                    var dataConf = $slider.find('.rsaddon-slider-conf').attr('data-conf');
                    var slider_conf = JSON.parse(dataConf);
                    if (slider_conf) {
                        const progressCircle = $slider.find(".autoplay-progress svg")[0];
                        const progressContent = $slider.find(".autoplay-progress span")[0];
                        var swiper = new Swiper(".swiper-<?php echo esc_attr($unique); ?>", {
                            slidesPerView: slider_conf.col_desktop,
                            speed: parseInt(slider_conf.sliderSpeed),
                            slidesPerGroup: parseInt(slider_conf.slidesToScroll),
                            spaceBetween: parseInt(slider_conf.spaceBetween),
                            loop: slider_conf.infinite === 'true' ? true : false,
                            freeMode: slider_conf.freeMode === 'true' ? true : false,
                            grabCursor: slider_conf.grabCursor === 'true' ? true : false,
                            mousewheel: slider_conf.mousewheel === 'true' ? true : false,
                            autoHeight: slider_conf.autoHeight === 'true' ? true : false,
                            centeredSlides: slider_conf.centerMode === 'true' ? true : false,
                            rtl: <?php echo esc_js($rtl); ?>,
                            effect: slider_conf.slideEffect, // 'fade', cube', 'coverflow', 'flip', 'cards', 'creative'
                            keyboard: {
                                enabled: slider_conf.keyboardControl === 'true' ? true : false,
                            },
                            navigation: {
                                nextEl: $slider.find(".swiper-button-next")[0],
                                prevEl: $slider.find(".swiper-button-prev")[0],
                            },
                            pagination: {
                                el: $slider.find(".swiper-pagination")[0],
                                clickable: true,
                                dynamicBullets: slider_conf.dynamicBullets === 'true' ? true : false,
                                <?php if (!empty($settings['slider_bullet_type'])) { ?>
                                    type: slider_conf.bulletType,
                                <?php } ?>
                            },
                            scrollbar: {
                                el: $slider.find(".swiper-scrollbar")[0],
                                hide: false,
                                draggable: true,
                            },
                            <?php if ('true' === $settings['slider_autoplay']) { ?>
                                autoplay: {
                                    delay: parseInt(slider_conf.interval),
                                    disableOnInteraction: false,
                                },
                            <?php } ?>
                            
                            on: {
                                <?php if (('true' === $settings['slider_autoplay']) && ('true' === $settings['slide_item_circle_progress'])) { ?>
                                    autoplayTimeLeft(s, time, progress) {
                                        progressCircle.style.setProperty("--progress", 1 - progress);
                                        progressContent.textContent = `${Math.ceil(time / 1000)}s`;
                                    },
                                
                                <?php } ?>

                                init() {
                                    const $normalSlideItem = $slider.find('.swiper-slide');
                                    const $notActiveSlide = $slider.find('.swiper-slide:not(.swiper-slide-active)');
                                    const animations = {
                                        '.sub-title': '<?php echo esc_attr($subTitleAnimation); ?>',
                                        '.title': '<?php echo esc_attr($titleAnimation); ?>',
                                        '.description': '<?php echo esc_attr($descAnimation); ?>',
                                        '.image-part img': '<?php echo esc_attr($imgAnimation); ?>',
                                        '.btn-wrapper .first-btn': '<?php echo esc_attr($btnOneAnimation); ?>',
                                        '.btn-wrapper .second-btn': '<?php echo esc_attr($btnTwoAnimation); ?>'
                                    };

                                    Object.entries(animations).forEach(([selector, animation]) => {
                                        if (animation) {
                                            $notActiveSlide.find(selector).removeClass(animation);
                                        }
                                    });
                                },
                                slideChangeTransitionStart() {
                                    const $activeSlide = $slider.find('.swiper-slide-active');
                                    const animations = {
                                        '.sub-title': '<?php echo esc_attr($subTitleAnimation); ?>',
                                        '.title': '<?php echo esc_attr($titleAnimation); ?>',
                                        '.description': '<?php echo esc_attr($descAnimation); ?>',
                                        '.image-part img': '<?php echo esc_attr($imgAnimation); ?>',
                                        '.btn-wrapper .first-btn': '<?php echo esc_attr($btnOneAnimation); ?>',
                                        '.btn-wrapper .second-btn': '<?php echo esc_attr($btnTwoAnimation); ?>'
                                    };

                                    Object.entries(animations).forEach(([selector, animation]) => {
                                        if (animation) {
                                            $activeSlide.find(selector).addClass(animation);
                                        }
                                    });
                                },
                            },

                            <?php if ('creative' === $settings['slider_effect']) {
                                if ('two' === $settings['slider_creative_style']) { ?>
                                    creativeEffect: {
                                        prev: {
                                            shadow: true,
                                            translate: ["-120%", 0, -500],
                                        },
                                        next: {
                                            shadow: true,
                                            translate: ["120%", 0, -500],
                                        },
                                    },
                                <?php } elseif ('three' === $settings['slider_creative_style']) { ?>
                                    creativeEffect: {
                                        prev: {
                                            shadow: true,
                                            translate: ["-125%", 0, -800],
                                            rotate: [0, 0, -90],
                                        },
                                        next: {
                                            shadow: true,
                                            translate: ["125%", 0, -800],
                                            rotate: [0, 0, 90],
                                        },
                                    },
                                <?php } elseif ('four' === $settings['slider_creative_style']) { ?>
                                    creativeEffect: {
                                        prev: {
                                            shadow: true,
                                            origin: "left center",
                                            translate: ["-10%", 0, -200],
                                            rotate: [0, 100, 0],
                                        },
                                        next: {
                                            origin: "right center",
                                            translate: ["10%", 0, -200],
                                            rotate: [0, -100, 0],
                                        },
                                    },
                                <?php } else { ?>
                                    creativeEffect: {
                                        prev: {
                                            shadow: true,
                                            translate: ["-20%", 0, -1],
                                        },
                                        next: {
                                            translate: ["100%", 0, 0],
                                        },
                                    },
                                <?php }
                            } ?>
                            
                            breakpoints: {
                                100: {
                                    slidesPerView: slider_conf.col_xs,
                                    spaceBetween: parseInt(slider_conf.spaceBetweenXs),
                                },
                                576: {
                                    slidesPerView: slider_conf.col_sm,
                                    spaceBetween: parseInt(slider_conf.spaceBetweenSm),
                                },
                                768: {
                                    slidesPerView: slider_conf.col_md,
                                    spaceBetween: parseInt(slider_conf.spaceBetweenMd),
                                },
                                992: {
                                    slidesPerView: slider_conf.col_lg,
                                    spaceBetween: parseInt(slider_conf.spaceBetweenLg),
                                },
                                1200: {
                                    slidesPerView: slider_conf.col_desktop,
                                    spaceBetween: parseInt(slider_conf.spaceBetween),
                                },
                            },
                        });
                        <?php if (('true' === $settings['slider_autoplay']) && ('true' === $settings['slider_stop_on_hover'])) { ?>
                            $slider.mouseenter(function(){
                                swiper.autoplay.pause();
                            });
                            $slider.mouseleave(function(){
                                swiper.autoplay.resume();
                            });
                        <?php } ?>
                    }
                });
            });
        </script>
    </div>

<?php
    }
}