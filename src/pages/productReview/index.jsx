import ProductReviewIndex from "@/components/productReview";
import ProductReviewContainer from "@/container/productReview";

export default function Retrospect() {
  return (
    <ProductReviewContainer.Provider>
      <ProductReviewIndex />
    </ProductReviewContainer.Provider>
  )
}


