use wasm_bindgen::prelude::wasm_bindgen;
use wasm_bindgen::prelude::JsValue;
use wasm_bindgen::Clamped;
use web_sys::CanvasRenderingContext2d;
use web_sys::ImageData;
use rand::random;

#[wasm_bindgen]
pub fn draw(
    ctx: &CanvasRenderingContext2d,
    width: u32,
    height: u32,
) -> Result<(), JsValue> {
    let mut data: Vec<u8> = Vec::new();

    for _x in 0..width {
        for _y in 0..height {
            data.push(random());
            data.push(random());
            data.push(random());
            data.push(255);
        }
    }

    let data = ImageData::new_with_u8_clamped_array_and_sh(Clamped(&data), width, height)?;
    ctx.put_image_data(&data, 0.0, 0.0)
}

#[wasm_bindgen]
pub fn draw_random_pixels(
    ctx2d: &CanvasRenderingContext2d,
    width: u32,
    height: u32,
) -> Result<(), JsValue> {
    let imagedata = ctx2d.get_image_data(0.0, 0.0, width as f64, height as f64);
    match imagedata {
        Ok(imagedata) => {
            let data = &mut imagedata.data();
            for i in (0..data.len()).step_by(4) {
                data[i] = random();
                data[i+1] = random();
                data[i+2] = random();
                data[i+3] = 255;
            }
            match ctx2d.put_image_data(&imagedata, 0.0, 0.0) {
                Ok(()) => Ok(()),
                Err(e) => Err(e)
            }
        },
        Err(e) => Err(e)
    }
}

#[wasm_bindgen]
pub fn add(x: i32, y: i32) -> i32 {
    x + y
}

#[cfg(test)]
mod tests {
    use super::add;

    #[test]
    fn _add() {
        assert_eq!(add(2, 2), 4);
    }
}
