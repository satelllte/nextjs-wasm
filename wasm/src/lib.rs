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
            data.push(0);
            data.push(random());
            data.push(random());
            data.push(255);
        }
    }

    let data = ImageData::new_with_u8_clamped_array_and_sh(Clamped(&data), width, height)?;
    ctx.put_image_data(&data, 0.0, 0.0)
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
