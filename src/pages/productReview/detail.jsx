import ProductReviewDetail from "@/components/productReview/detail";
import ProductReviewContainer from "@/container/productReview/detail";

export default function Retrospect() {
  return (
    <ProductReviewContainer.Provider>
      <ProductReviewDetail />
    </ProductReviewContainer.Provider>
  )
}


