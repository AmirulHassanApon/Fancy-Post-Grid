<?php
use Elementor\Control_Media;
?>
<div class="swiper-slide item-<?php echo esc_attr($slideItem); ?> elementor-repeater-item-<?php echo esc_attr( $item['_id'] ); ?>">
    <?php if ('rs-e-container' === $container) { ?>
        <div class="<?php echo esc_attr( $container ); ?>">
    <?php } ?>
    
    <div class="slider-inner ">
        <div class="content-part">
            <?php if (!empty($subTitle)) { ?>
                <div class="sub-title <?php echo esc_attr($subTitleAnimation); ?>" <?php echo esc_attr($subTitleAnimationTiming); ?>><?php echo wp_kses_post($subTitle); ?></div>
            <?php }

            if (!empty($title)) { ?>
                <<?php echo esc_html($settings['title_tag']); ?> class="title <?php echo esc_attr($titleAnimation); ?>" <?php echo esc_attr($titleAnimationTiming); ?>><?php echo wp_kses_post($title); ?></<?php echo esc_html($settings['title_tag']); ?>>
            <?php }
            
            if (!empty($description)) { ?>
                <div class="description <?php echo esc_attr($descAnimation); ?>" <?php echo esc_attr($descAnimationTiming); ?>><?php echo wp_kses_post($description); ?></div>
            <?php }
            
            if ((!empty($btn_txt) || !empty($btn_txt2)) && ('yes' === $settings['show_btns'])) { ?>
                <div class="btn-wrapper">
                    <?php if (!empty($btn_txt)) { ?>
                        <a class="first-btn <?php echo esc_attr($btnOneAnimation); ?>" href="<?php echo esc_url($btn_link); ?>" <?php echo esc_attr($btnOneAnimationTiming); ?>><?php echo esc_html($btn_txt); ?></a>
                    <?php }
                    if (!empty($btn_txt2)) { ?>
                        <a class="second-btn <?php echo esc_attr($btnTwoAnimation); ?>" href="<?php echo esc_url($btn_link2); ?>" <?php echo esc_attr($btnOneAnimationTiming); ?>><?php echo esc_html($btn_txt2); ?></a>
                    <?php } ?>
                </div>
            <?php } ?>
        </div>
        <?php if (!empty($item['layer_image']['id'])) {?>
            <div class="image-part">
                <img class="<?php echo esc_attr($imgAnimation); ?>" src="<?php echo esc_url($layer_image); ?>" alt="<?php echo esc_attr(Control_Media::get_image_alt($item['layer_image'])); ?>" <?php echo esc_attr($imgAnimationTiming); ?>>
            </div>
        <?php } ?>
    </div>

    <?php if ('rs-e-container' === $container) { ?>
        </div>
    <?php } ?>
</div>