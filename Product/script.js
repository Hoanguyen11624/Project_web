document.addEventListener("DOMContentLoaded", function () {
    const selectAllCheckbox = document.getElementById("select-all");
    const itemCheckboxes = document.querySelectorAll(".select-item");
    const quantityInputs = document.querySelectorAll(".quantity");
    const removeButtons = document.querySelectorAll(".remove-btn");
    const checkoutButton = document.getElementById("checkout-btn");
    const totalPriceElement = document.getElementById("total-price");

    // Cập nhật giao diện đồng bộ với thanh điều hướng
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.style.backgroundColor = "#f8f8f8";

    const navbar = document.createElement("div");
    navbar.style.background = "linear-gradient(90deg, #ff6a6a, #7b68ee)";
    navbar.style.padding = "10px";
    navbar.style.color = "white";
    navbar.style.fontWeight = "bold";
    navbar.style.display = "flex";
    navbar.style.justifyContent = "space-between";
    navbar.innerHTML = '<span>Zorro Knight</span> <span>Trang chủ | Bộ sưu tập | Kiến thức</span>';
    document.body.prepend(navbar);

    // Chọn/bỏ chọn tất cả sản phẩm
    selectAllCheckbox.addEventListener("change", function () {
        itemCheckboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
        updateTotal();
    });

    // Cập nhật tổng tiền khi thay đổi số lượng
    quantityInputs.forEach(input => {
        input.addEventListener("input", function () {
            updateTotalPrice(input);
            updateTotal();
        });
    });

    function updateTotalPrice(input) {
        const row = input.closest("tr");
        const price = parseFloat(row.querySelector(".item-price").innerText.replace(/[^0-9]/g, ""));
        const quantity = parseInt(input.value) || 1;
        row.querySelector(".item-total").innerText = (price * quantity).toLocaleString("vi-VN") + "đ";
    }

    function updateTotal() {
        let total = 0;
        itemCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const row = checkbox.closest("tr");
                const itemTotal = parseFloat(row.querySelector(".item-total").innerText.replace(/[^0-9]/g, ""));
                total += itemTotal;
            }
        });
        totalPriceElement.innerText = total.toLocaleString("vi-VN") + "đ";
    }

    // Xóa sản phẩm khỏi giỏ hàng
    removeButtons.forEach(button => {
        button.addEventListener("click", function () {
            button.closest("tr").remove();
            updateTotal();
        });
    });

    // Chuyển sang trang thanh toán
    checkoutButton.addEventListener("click", function () {
        if (parseFloat(totalPriceElement.innerText.replace(/[^0-9]/g, "")) === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
            return;
        }
        alert("Chuyển sang trang thanh toán...");
        window.location.href = "checkout.html";
    });
});
